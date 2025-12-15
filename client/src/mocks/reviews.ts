import type { Review } from '../types/review';

export const reviews: Review[] = [
  {
    id: '1',
    date: '2019-04-24',
    user: {
      name: 'Max',
      avatarUrl: '/img/avatar-max.jpg',
    },
    comment: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The building is green and from 18th century.',
    rating: 4.8,
  },
  {
    id: '2',
    date: '2023-10-15',
    user: {
      name: 'Sophia',
      avatarUrl: '/img/avatar-angelina.jpg',
    },
    comment: 'Perfect location, clean apartment, friendly host. Would definitely come back!',
    rating: 5.0,
  },
  {
    id: '3',
    date: '2023-08-22',
    user: {
      name: 'David',
      avatarUrl: '/img/avatar.svg',
    },
    comment: 'Great value for money. The view was amazing! The apartment had everything we needed for a comfortable stay.',
    rating: 4.5,
  },
];