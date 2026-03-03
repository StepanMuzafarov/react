import { createReducer } from '@reduxjs/toolkit';
import { 
  requireAuthorization, 
  offersCityList, 
  setOffersDataLoadingStatus, 
  setError,
  setSortType,
  changeCity,
  toggleFavorite,
  setFavoriteStatus,
  setReviews,
  setUserData
} from './action';
import { AuthorizationStatus } from '../const';
import type { State } from '../types/state';
import type { OffersList } from '../types/offer';
import type { ReviewsList } from '../types/review';

const initialState: State = {
  authorizationStatus: AuthorizationStatus.Unknown,
  offers: [] as OffersList,
  isOffersDataLoading: false,
  error: null,
  sortType: 'popular',
  reviews: [] as ReviewsList,
  user: null,
  city: 'Paris',
};

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(offersCityList, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setSortType, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
    })
    .addCase(toggleFavorite, (state, action) => {
      const offer = state.offers.find(o => o.id === action.payload);
      if (offer) {
        offer.isFavorite = !offer.isFavorite;
      }
    })
    .addCase(setFavoriteStatus, (state, action) => {
      const offer = state.offers.find(o => o.id === action.payload.offerId);
      if (offer) {
        offer.isFavorite = action.payload.status; 
      }
    })
    .addCase(setReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.user = action.payload;
    }); 
});