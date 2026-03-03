// src/types/offer.ts

export type Offer = {
  id: string;
  title: string;
  description?: string;  // ← Может быть undefined
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
  photos?: string[];  // ← Массив дополнительных фото
  rooms: number;
  guests: number;
  bedrooms?: number;  // ← Добавьте
  maxAdults?: number;  // ← Добавьте
  features?: string[];  // ← Было goods в ТЗ, но лучше features
  commentsCount?: number;
  author?: {  // ← Было host в ТЗ, но лучше author
    id: string;
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
};

// ✅ FullOffer — это тот же Offer (для совместимости)
export type FullOffer = Offer;

export type OffersList = Offer[];