import type { OfferList } from '../types/offer';

export const offersList: OfferList = [
  {
    id: '1',
    title: 'Beautiful & luxurious apartment at great location',
    type: 'apartment',
    price: 120,
    isPremium: true,
    rating: 4.8,
    images: ['/img/apartment-01.jpg']
  },
  {
    id: '2',
    title: 'Wood and stone place',
    type: 'room',
    price: 80,
    isPremium: false,
    rating: 4.0,
    images: ['/img/room.jpg']
  },
  {
    id: '3',
    title: 'Canal View Prinsengracht',
    type: 'apartment',
    price: 132,
    isPremium: false,
    rating: 4.2,
    images: ['/img/apartment-02.jpg']
  },
  {
    id: '4',
    title: 'Nice, cozy, warm big bed apartment',
    type: 'apartment',
    price: 180,
    isPremium: true,
    rating: 5.0,
    images: ['/img/apartment-03.jpg']
  }
];