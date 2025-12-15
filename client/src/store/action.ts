import type { FullOffer } from '../types/offer';
import type { SortType } from '../types/state';

export const CHANGE_CITY = 'CHANGE_CITY';
export const FILL_OFFERS = 'FILL_OFFERS';
export const SET_SORT_TYPE = 'SET_SORT_TYPE';
export const SET_AUTHORIZATION_STATUS = 'SET_AUTHORIZATION_STATUS';
export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';
export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';

export interface ChangeCityAction {
  type: typeof CHANGE_CITY;
  payload: string;
}

export interface FillOffersAction {
  type: typeof FILL_OFFERS;
  payload: FullOffer[];
}

export interface SetSortTypeAction {
  type: typeof SET_SORT_TYPE;
  payload: SortType;
}

export interface SetAuthorizationStatusAction {
  type: typeof SET_AUTHORIZATION_STATUS;
  payload: string;
}

export interface SetLoadingStatusAction {
  type: typeof SET_LOADING_STATUS;
  payload: boolean;
}

export interface ToggleFavoriteAction {
  type: typeof TOGGLE_FAVORITE;
  payload: string;
}

export type ActionTypes = 
  | ChangeCityAction 
  | FillOffersAction 
  | SetSortTypeAction 
  | SetAuthorizationStatusAction 
  | SetLoadingStatusAction
  | ToggleFavoriteAction;

export const changeCity = (city: string): ChangeCityAction => ({
  type: CHANGE_CITY,
  payload: city,
});

export const fillOffers = (offers: FullOffer[]): FillOffersAction => ({
  type: FILL_OFFERS,
  payload: offers,
});

export const setSortType = (sortType: SortType): SetSortTypeAction => ({
  type: SET_SORT_TYPE,
  payload: sortType,
});

export const setAuthorizationStatus = (status: string): SetAuthorizationStatusAction => ({
  type: SET_AUTHORIZATION_STATUS,
  payload: status,
});

export const setLoadingStatus = (isLoading: boolean): SetLoadingStatusAction => ({
  type: SET_LOADING_STATUS,
  payload: isLoading,
});

export const toggleFavorite = (id: string): ToggleFavoriteAction => ({
  type: TOGGLE_FAVORITE,
  payload: id,
});