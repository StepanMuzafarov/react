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
  setOffersDataLoadingStatus,
} from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute, AuthorizationStatus, TIMEOUT_SHOW_ERROR } from '../const';
import type { AuthData, UserData } from '../types/user-data';
import type { FullOffer } from '../types/offer';

const MIN_LOADING_TIME = 1000;

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
    const startTime = Date.now();
    dispatch(setOffersDataLoadingStatus(true));
    
    try {
      const { data } = await api.get<OffersList>(APIRoute.Offers);
      dispatch(offersCityList(data));
    } catch (error) {
      handleError(dispatch, error);
      throw error;
    } finally {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, MIN_LOADING_TIME - elapsedTime);

      await new Promise(resolve => setTimeout(resolve, remainingTime));
      dispatch(setOffersDataLoadingStatus(false));
    }
  },
);

export const fetchOfferByIdAction = createAsyncThunk<FullOffer, string, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'offer/fetchOfferById',
  async (offerId, { extra: api }) => {
    const { data } = await api.get<FullOffer>(`${APIRoute.Offers}/${offerId}`);
    return data;
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
      if (data.token) {
        saveToken(data.token);
      }
      dispatch(setUserData({
        id: String(data.id),
        email: data.email,
        username: data.username,
        avatar: data.avatar,
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
      dispatch(setUserData({
        id: String(data.id),
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
      dispatch(setUserData(null));
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