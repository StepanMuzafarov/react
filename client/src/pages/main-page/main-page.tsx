import type { JSX } from 'react';
import { useState } from 'react';
import { useAppSelector } from '../../hooks';
import CitiesCardList from '../../components/cities-card-list/cities-card-list';
import { Logo } from '../../components/logo/logo';
import Map from '../../components/map/map';
import CitiesList from '../../components/cities-list/cities-list';
import SortOptions from '../../components/sort-options/sort-options';
import { getOffersByCity, sortOffers } from '../../utils';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';

function MainPage(): JSX.Element {
  const city = useAppSelector((state) => state.city);
  const allOffers = useAppSelector((state) => state.offers);
  const sortType = useAppSelector((state) => state.sortType);
  
  const [activeOfferId, setActiveOfferId] = useState<string | undefined>();

  const cityOffers = getOffersByCity(allOffers, city);
  const sortedOffers = sortOffers(cityOffers, sortType);
  const hasOffers = sortedOffers.length > 0;

  return (
    <div className={`page page--gray page--main ${!hasOffers ? 'page__main--index-empty' : ''}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={AppRoute.Favorites}
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">Myemail@gmail.com</span>
                    <span className="header__favorite-count">
                      {allOffers.filter(offer => offer.isFavorite).length}
                    </span>
                  </Link>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="#">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

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
    </div>
  );
}

export default MainPage;