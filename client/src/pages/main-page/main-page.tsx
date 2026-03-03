import type { JSX } from 'react';
import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks';
import CitiesCardList from '../../components/cities-card-list/cities-card-list';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortOptions from '../../components/sort-options/sort-options';
import { getOffersByCity, sortOffers } from '../../utils';
import { toggleFavoriteAction } from '../../store/api-actions';

function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const city = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  const sortType = useAppSelector((state) => state.sortType);
  
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>();

  const cityOffers = getOffersByCity(allOffers, city);
  const sortedOffers = sortOffers(cityOffers, sortType);
  const hasOffers = sortedOffers.length > 0;

  // src/pages/main-page/main-page.tsx
  const handleCardFavoriteClick = (offerId: string) => {
    const offer = allOffers.find(o => o.id === offerId);
    if (offer) {
      // ✅ Передаём НОВЫЙ статус (после переключения)
      dispatch(toggleFavoriteAction({ 
        offerId, 
        status: !offer.isFavorite  // ← Инвертируем текущий статус
      }));
    }
  };

  return (
    // ✅ Только <main>, без обёртки .page и без <header>
    <main className={`page__main page__main--index ${!hasOffers ? 'page__main--index-empty' : ''}`}>
      <h1 className="visually-hidden">Cities</h1>
      
      <div className="tabs">
        <section className="locations container">
          <CitiesList />
        </section>
      </div>
      
      <div className="cities">
        {hasOffers ? (
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {sortedOffers.length} places to stay in {city}
              </b>
              <SortOptions />
              <CitiesCardList
                offers={sortedOffers}
                onCardHover={(id) => setActiveOfferId(id)}
                onFavoriteClick={handleCardFavoriteClick}  // ✅ Передаём обработчик
              />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  offers={cityOffers}
                  activeOfferId={activeOfferId}
                  type="cities"
                />
              </section>
            </div>
          </div>
        ) : (
          <div className="cities__places-container cities__places-container--empty container">
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">
                  We could not find any property available at the moment in {city}
                </p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>
        )}
      </div>
    </main>
  );
}

export {MainPage};