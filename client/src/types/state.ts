import type { FullOffer } from './offer';

export type SortType = 'popular' | 'price-low-to-high' | 'price-high-to-low' | 'top-rated';

export interface State {
  city: string;
  offers: FullOffer[];
  sortType: SortType;
  authorizationStatus: string;
  isLoading: boolean;
}
