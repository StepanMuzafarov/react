import type { JSX } from 'react';
import { useAppSelector } from '../../hooks';
import CitiesCard from '../../components/cities-card/cities-card';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { toggleFavoriteAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';

function FavoritesPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const offers = useAppSelector((state) => state.offers);
  
  const favoriteOffers = offers.filter(offer => offer.isFavorite);
  
  const uniqueCities = Array.from(
    new Set(favoriteOffers.map(offer => offer.city.name))
  );
  
  const groupedOffers = uniqueCities.map(city => ({
    city,
    offers: favoriteOffers.filter(offer => offer.city.name === city)
  }));

  const handleFavoriteClick = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (offer) {
      dispatch(toggleFavoriteAction({
        offerId,
        status: !offer.isFavorite
      }));
    }
  };

  if (favoriteOffers.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <main className="page__main page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
        <footer className="footer">
          <Link className="footer__logo-link" to={AppRoute.Main}>
            <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className="page">
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {groupedOffers.map(({ city, offers: cityOffers }) => (
                <li key={city} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <a className="locations__item-link" href="#">
                        <span>{city}</span>
                      </a>
                    </div>
                  </div>
                  <div className="favorites__places">
                    {cityOffers.map((offer) => (
                      <CitiesCard
                        key={offer.id}
                        offer={offer}
                        cardType="favorites"
                        onFavoriteClick={handleFavoriteClick}
                      />
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img className="footer__logo" src="/img/logo.svg" alt="6 cities logo" width="64" height="33" />
        </Link>
      </footer>
    </div>
  );
}

export { FavoritesPage };