import { describe, it, expect } from 'vitest';
import { getOffersByCity, sortOffers } from '../utils';
import { makeFakeOffer } from './mocks';
import { CITIES } from '../const';

describe('getOffersByCity', () => {
  it('возвращает только объявления указанного города', () => {
    const paris = CITIES[0];
    const cologne = CITIES[1];
    const parisOffer = { ...makeFakeOffer(), city: { ...makeFakeOffer().city, name: paris } };
    const cologneOffer = { ...makeFakeOffer(), city: { ...makeFakeOffer().city, name: cologne } };
    const result = getOffersByCity([parisOffer, cologneOffer], paris);
    expect(result).toHaveLength(1);
    expect(result[0].city.name).toBe(paris);
  });

  it('возвращает пустой массив, если город не найден', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];
    expect(getOffersByCity(offers, 'Tokyo')).toHaveLength(0);
  });

  it('возвращает пустой массив при пустом списке предложений', () => {
    expect(getOffersByCity([], 'Paris')).toEqual([]);
  });
});

describe('sortOffers', () => {
  it('сортирует от дешёвых к дорогим (price-low-to-high)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];
    const result = sortOffers(offers, 'price-low-to-high');
    expect(result[0].price).toBe(100);
    expect(result[2].price).toBe(300);
  });

  it('сортирует от дорогих к дешёвым (price-high-to-low)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 300 },
    ];
    const result = sortOffers(offers, 'price-high-to-low');
    expect(result[0].price).toBe(300);
  });

  it('сортирует по рейтингу (top-rated)', () => {
    const offers = [
      { ...makeFakeOffer(), rating: 3 },
      { ...makeFakeOffer(), rating: 5 },
      { ...makeFakeOffer(), rating: 4 },
    ];
    const result = sortOffers(offers, 'top-rated');
    expect(result[0].rating).toBe(5);
  });

  it('не изменяет исходный массив', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];
    const copy = [...offers];
    sortOffers(offers, 'price-low-to-high');
    expect(offers).toEqual(copy);
  });

  it('корректно работает при пустом массиве', () => {
    const result = sortOffers([], 'popular');
    expect(result).toEqual([]);
  });
});