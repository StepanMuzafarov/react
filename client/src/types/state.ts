// src/types/state.ts
import { store } from '../store';
import type { AuthorizationStatusType } from './authorization-status';
import type { OffersList } from './offer';
import type { ReviewsList } from './review';

export type State = {
  authorizationStatus: AuthorizationStatusType;
  offers: OffersList;
  isOffersDataLoading: boolean;  // ← Должно быть!
  error: string | null;
  sortType: string;
  reviews: ReviewsList;
  user: {
    id: string;
    email: string;
    username: string;
    avatar: string;
    isPro: boolean;
  } | null;
  city: string;
};

export type AppDispatch = typeof store.dispatch;