import type { Offer } from './types/offer';
import { BACKEND_URL } from './services/api';

export const getOffersByCity = (offers: Offer[], city: string): Offer[] => {
  return offers.filter(offer => offer.city.name === city);
};

export const sortOffers = (offers: Offer[], sortType: string): Offer[] => {
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

export const getImageUrl = (imageUrl: string | null | undefined): string => {
  if (!imageUrl) {
    return ''; 
  }
  
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl;
  }

  return `${BACKEND_URL}${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
};