import type { FullOffer } from './types/offer';
import type { SortType } from './types/state';
import type { City } from './types/offer';

export const getOffersByCity = (offers: FullOffer[], city: string): FullOffer[] => {
  return offers.filter(offer => offer.city.name === city);
};

export const sortOffers = (offers: FullOffer[], sortType: SortType): FullOffer[] => {
  const sortedOffers = [...offers];
  
  switch (sortType) {
    case 'price-low-to-high':
      return sortedOffers.sort((a, b) => a.price - b.price);
    
    case 'price-high-to-low':
      return sortedOffers.sort((a, b) => b.price - a.price);
    
    case 'top-rated':
      return sortedOffers.sort((a, b) => b.rating - a.rating);
    
    case 'popular':
    default:
      return sortedOffers;
  }
};

export const getCity = (cityName: string, cities: City[]): City | undefined => {
  return cities.find(city => city.name === cityName);
};

export const getUniqueCities = (offers: FullOffer[]): string[] => {
  const cities = offers.map(offer => offer.city.name);
  return Array.from(new Set(cities));
};