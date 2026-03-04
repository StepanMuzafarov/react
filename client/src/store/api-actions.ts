import type { AxiosInstance, AxiosError } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { AppDispatch, State } from '../types/state';
import type { OffersList } from '../types/offer';
import type { ReviewsList } from '../types/review';
import { 
  offersCityList, 
  requireAuthorization, 
  setError, 
  setReviews,
  setUserData,
  toggleFavorite,
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import type { AuthData, UserData } from '../types/user-data';

const handleError = (dispatch: AppDispatch, error: unknown) => {
  const message =
    (error as AxiosError<{ error: string }>)?.response?.data?.error || 'Произошла ошибка';
  dispatch(setError(message));
  setTimeout(() => dispatch(setError(null)), TIMEOUT_SHOW_ERROR);
};

export const fetchOffersAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<OffersList>(APIRoute.Offers);
      dispatch(offersCityList(data));
    } catch (error) {
      handleError(dispatch, error);
      throw error;
    }
  },
);

export const checkAuthAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<UserData>(APIRoute.Login);
      
      // ✅ Сохраняем токен из checkAuth
      if (data.token) {
        saveToken(data.token);
      }
      
      // ✅ Сохраняем данные пользователя в Redux
      dispatch(setUserData({
        id: String(data.id),        // ✅ Приводим к string на всякий случай
        email: data.email,
        username: data.username,    // ✅ Теперь это поле есть в UserData
        avatar: data.avatar,        // ✅ Теперь это поле есть в UserData
        isPro: data.isPro,
      }));
      
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
    } catch (error) {
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserData(null));
    }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({ email, password }, { dispatch, extra: api }) => {
    try {
      const { data } = await api.post<UserData>(APIRoute.Login, { email, password });
      saveToken(data.token);
      
      // ✅ Сохраняем данные пользователя в Redux
      dispatch(setUserData({
        id: String(data.id),        // ✅ Приводим к string
        email: data.email,
        username: data.username,
        avatar: data.avatar,
        isPro: data.isPro,
      }));
      
      dispatch(requireAuthorization(AuthorizationStatus.Auth));
      return data;
    } catch (error) {
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      handleError(dispatch, error);
      throw error;
    }
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, { dispatch, extra: api }) => {
    try {
      await api.delete(APIRoute.Logout);
      dropToken();
      dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
      dispatch(setUserData(null));  // ✅ Очищаем данные пользователя при выходе
    } catch (error) {
      handleError(dispatch, error);
      throw error;
    }
  },
);

export const fetchReviewsAction = createAsyncThunk<void, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/fetchReviews',
  async (offerId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<ReviewsList>(`${APIRoute.Reviews}/${offerId}`);
      dispatch(setReviews(data));
    } catch (error) {
      handleError(dispatch, error);
      throw error;
    }
  },
);

export const postReviewAction = createAsyncThunk<void, { offerId: string; comment: string; rating: number }, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/postReview',
  async ({ offerId, comment, rating }, { dispatch, extra: api }) => {
    try {
      await api.post(`${APIRoute.Reviews}/${offerId}`, { comment, rating });
      dispatch(fetchReviewsAction(offerId));
    } catch (error) {
      handleError(dispatch, error);
      throw error;
    }
  },
);

export const clearErrorAction = () => (dispatch: AppDispatch) => {
  setTimeout(
    () => dispatch(setError(null)),
    TIMEOUT_SHOW_ERROR,
  );
};

export const toggleFavoriteAction = createAsyncThunk<
  { offerId: string; status: boolean },
  { offerId: string; status: boolean },
  { dispatch: AppDispatch; state: State; extra: AxiosInstance }
>(
  'offer/toggleFavorite',
  async ({ offerId, status }, { dispatch, extra: api }) => {
    dispatch(toggleFavorite(offerId));
    
    try {
      await api.post(`${APIRoute.Favorite}/${offerId}/${status ? 1 : 0}`);
      dispatch(fetchOffersAction());
      
      return { offerId, status };
    } catch (error) {
      dispatch(toggleFavorite(offerId));
      handleError(dispatch, error);
      throw error;
    }
  }
);