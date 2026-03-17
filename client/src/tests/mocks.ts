import { faker } from '@faker-js/faker';
import { AuthorizationStatus, CITIES } from '../const';
import type { State } from '../types/state';
import type { Offer, FullOffer} from '../types/offer';
import type { Review } from '../types/review';

export function makeFakeOffer(): Offer {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words(3),
    type: 'apartment',
    price: faker.number.int({ min: 50, max: 500 }),
    city: {
      name: CITIES[0],
      location: {
        latitude: faker.number.float({ min: 48, max: 54 }),
        longitude: faker.number.float({ min: 2, max: 11 }),
        zoom: 13,
      },
    },
    location: {
      latitude: faker.number.float({ min: 48, max: 54 }),
      longitude: faker.number.float({ min: 2, max: 11 }),
    },
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.number.float({ min: 1, max: 5 }),
    previewImage: faker.image.url(),
    rooms: faker.number.int({ min: 1, max: 5 }),
    guests: faker.number.int({ min: 1, max: 10 }),
  };
}

export function makeFakeFullOffer(): FullOffer {
  return {
    ...makeFakeOffer(),
    description: faker.lorem.paragraph(),
    bedrooms: faker.number.int({ min: 1, max: 5 }),
    features: [faker.commerce.productName(), faker.commerce.productName()],
    author: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
    photos: [faker.image.url(), faker.image.url()],
    maxAdults: faker.number.int({ min: 1, max: 10 }),
  };
}

export function makeFakeReview(): Review {
  return {
    id: faker.string.uuid(),
    comment: faker.lorem.sentence(),
    rating: faker.number.int({ min: 1, max: 5 }),
    date: new Date().toISOString(),
    user: {
      name: faker.person.fullName(),
      avatarUrl: faker.image.avatar(),
      isPro: faker.datatype.boolean(),
    },
  };
}

export function makeFakeStore(
  overrides: Partial<State> = {}
): State {
  return {
    city: CITIES[0],
    offers: [],
    authorizationStatus: AuthorizationStatus.NoAuth,
    isOffersDataLoading: false,
    error: null,
    sortType: 'popular',
    reviews: [],
    user: null,
    ...overrides,
  };
}