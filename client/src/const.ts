export const AuthorizationStatus = {
  Auth: 'AUTH',
  NoAuth: 'NO_AUTH',
  Unknown: 'UNKNOWN',
} as const;

export type AuthorizationStatusType = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

export const APIRoute = {
  Offers: '/offers',
  Login: '/login',
  Logout: '/logout',
  Reviews: '/comments', 
  Users: '/users',
  Favorite: '/favorite',
} as const;

export const TIMEOUT_SHOW_ERROR = 2000;

export const SortType = {
  Popular: 'popular',
  PriceLowToHigh: 'price-low-to-high',
  PriceHighToLow: 'price-high-to-low',
  TopRated: 'top-rated',
} as const;

export const SORT_TYPES = Object.values(SortType);

export const AppRoute = {
  Main: '/',
  Login: '/login',
  Favorites: '/favorites',
  Offer: '/offer/:id',
  NotFound: '*',
} as const;

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf',
] as const;

export type City = typeof CITIES[number];