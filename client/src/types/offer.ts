export type Offer = {
  id: string;
  title: string;
  description?: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: {
      latitude: number;
      longitude: number;
      zoom: number;
    };
  };
  location: {
    latitude: number;
    longitude: number;
  };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
  photos?: string[];
  rooms: number;
  guests: number;
  bedrooms?: number; 
  maxAdults?: number;
  features?: string[]; 
  commentsCount?: number;
  author?: { 
    id: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

export type FullOffer = Offer;

export type OffersList = Offer[];