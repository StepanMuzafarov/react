import type { FullOffer } from '../types/offer.ts';

export const offers: FullOffer[] = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 12
      }
    },
    location: {
      latitude: 52.3909553943508,
      longitude: 4.85309666406198,
      zoom: 8
    },
    isFavorite: false,
    isPremium: true,
    rating: 4.8,
    description: 'A quiet cozy and picturesque that hides behind a river by the unique lightness of Amsterdam.\nAn independent House, strategically located between Rembrand Square and National Opera.',
    bedrooms: 3,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge'],
    host: {
      name: 'Angelina',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: ['img/apartment-01.jpg', 'img/apartment-02.jpg', 'img/apartment-03.jpg'],
    maxAdults: 4
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 12
      }
    },
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 8
    },
    isFavorite: true,
    isPremium: false,
    rating: 4.0,
    description: 'A quiet cozy and picturesque place in Paris.',
    bedrooms: 1,
    goods: ['Wi-Fi', 'Heating', 'Kitchen'],
    host: {
      name: 'Max',
      avatarUrl: 'img/avatar-max.jpg',
      isPro: false
    },
    images: ['img/room.jpg', 'img/studio-01.jpg'],
    maxAdults: 2
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 12
      }
    },
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 8
    },
    isFavorite: false,
    isPremium: false,
    rating: 4.2,
    description: 'Nice apartment with canal view in Brussels.',
    bedrooms: 2,
    goods: ['Wi-Fi', 'Heating', 'Kitchen', 'Fridge'],
    host: {
      name: 'John',
      avatarUrl: 'img/avatar.svg',
      isPro: false
    },
    images: ['img/apartment-02.jpg', 'img/apartment-03.jpg'],
    maxAdults: 3
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    city: {
      name: 'Hamburg',
      location: {
        latitude: 53.550341,
        longitude: 10.000654,
        zoom: 12
      }
    },
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 8
    },
    isFavorite: true,
    isPremium: true,
    rating: 5.0,
    description: 'Perfect apartment for family vacation in Hamburg.',
    bedrooms: 3,
    goods: ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Kitchen', 'Dishwasher', 'Fridge'],
    host: {
      name: 'Maria',
      avatarUrl: 'img/avatar-angelina.jpg',
      isPro: true
    },
    images: ['img/apartment-03.jpg', 'img/studio-photos.jpg'],
    maxAdults: 4
  }
];