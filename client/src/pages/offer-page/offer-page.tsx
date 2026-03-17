import type { JSX } from 'react';
import { useState, useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchOfferByIdAction, fetchReviewsAction, toggleFavoriteAction } from '../../store/api-actions';
import ReviewsList from '../../components/reviews-list/reviews-list';
import Map from '../../components/map/map';
import CitiesCard from '../../components/cities-card/cities-card';
import ReviewForm from '../../components/review-form/review-form';
import { getOffersByCity, getImageUrl } from '../../utils';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus, getReviews } from '../../store/selectors';
import { LoadingPage } from '../../components/loading-page/loading-page';
import type { FullOffer } from '../../types/offer';

function OfferPage(): JSX.Element {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  const offers = useAppSelector((state) => state.offers);
  const reviews = useAppSelector(getReviews);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  
  const [offer, setOffer] = useState<FullOffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeNearOfferId, setActiveNearOfferId] = useState<string | undefined>();

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      dispatch(fetchOfferByIdAction(id))
        .unwrap()
        .then((fetchedOffer) => {
          setOffer(fetchedOffer);
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
          setOffer(null);
        });
      
      dispatch(fetchReviewsAction(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
  return <LoadingPage />;
  }

  if (!offer) {
    return <Navigate to={AppRoute.NotFound} replace />;
  }

  const cityOffers = getOffersByCity(offers, offer.city.name);
  const nearOffers = cityOffers.filter((o) => o.id !== offer.id).slice(0, 3);

  const handleFavoriteClick = () => {
    dispatch(toggleFavoriteAction({
      offerId: offer.id,
      status: !offer.isFavorite
    }));
  };

  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  return (
    <div className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          <div className="offer__gallery-container container">
            <div className="offer__gallery">
              {offer.photos?.map((image, index) => (
                <div key={index} className="offer__image-wrapper">
                  <img
                    className="offer__image"
                    src={getImageUrl(image)}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="offer__container container">
            <div className="offer__wrapper">
              {offer.isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{offer.title}</h1>
                <button
                  className={`offer__bookmark-button button ${offer.isFavorite ? 'offer__bookmark-button--active' : ''}`}
                  type="button"
                  onClick={handleFavoriteClick}
                >
                  <svg className="offer__bookmark-icon" width="31" height="33">
                    <use href="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>

              <div className="offer__rating rating">
                <div className="offer__stars rating__stars">
                  <span style={{ width: `${offer.rating * 20}%` }}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="offer__rating-value rating__value">{offer.rating}</span>
              </div>

              <ul className="offer__features">
                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                <li className="offer__feature offer__feature--bedrooms">
                  {offer.rooms} Bedroom{offer.rooms !== 1 ? 's' : ''}
                </li>
                <li className="offer__feature offer__feature--adults">
                  Max {offer.guests} adult{offer.guests !== 1 ? 's' : ''}
                </li>
              </ul>

              <div className="offer__price">
                <b className="offer__price-value">&euro;{offer.price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              <div className="offer__inside">
                <h2 className="offer__inside-title">What's inside</h2>
                <ul className="offer__inside-list">
                  {offer.features?.map((good, index) => (
                    <li key={index} className="offer__inside-item">{good}</li>
                  ))}
                </ul>
              </div>

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>
                <div className="offer__host-user user">
                  <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.author?.isPro ? 'offer__avatar-wrapper--pro' : ''}`}>
                    {offer.author?.avatarUrl && (
                      <img
                        className="offer__avatar user__avatar"
                        src={getImageUrl(offer.author.avatarUrl)}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    )}
                  </div>
                  <span className="offer__user-name">{offer.author?.name || 'Unknown'}</span>
                  {offer.author?.isPro && <span className="offer__user-status">Pro</span>}
                </div>
                <div className="offer__description">
                  {(offer.description ?? '').split('\n').map((paragraph, index) => (
                    <p key={index} className="offer__text">{paragraph}</p>
                  ))}
                </div>
              </div>

              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews · <span className="reviews__amount">{reviews.length}</span>
                </h2>
                <ReviewsList reviews={reviews} />
                
                {isAuth && <ReviewForm offerId={offer.id} />}
              </section>
            </div>
          </div>

          <section className="offer__map map">
            <Map
              offers={[...nearOffers, offer]}
              activeOfferId={activeNearOfferId || offer.id}
              type="offer"
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              {nearOffers.map((nearOffer) => (
                <CitiesCard
                  key={nearOffer.id}
                  offer={nearOffer}
                  onCardHover={setActiveNearOfferId}
                  cardType="near-places"
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export { OfferPage };