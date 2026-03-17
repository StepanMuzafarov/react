import type { State } from '../types/state';
export const getAuthorizationStatus = (state: State) =>
  state.authorizationStatus;
export const getOffersLoadingStatus = (state: State): boolean =>
  state.isOffersDataLoading;
export const getUserEmail = (state: State): string | undefined =>
  state.user?.email;
export const getUserAvatar = (state: State): string | undefined =>
  state.user?.avatar;
export const getUserName = (state: State): string | undefined =>
  state.user?.username;
export const getUserIsPro = (state: State): boolean | undefined =>
  state.user?.isPro;
export const getOffers = (state: State) => state.offers;
export const getSortType = (state: State) => state.sortType;
export const getCity = (state: State) => state.city;
export const getReviews = (state: State) => state.reviews;
export const getError = (state: State) => state.error;
