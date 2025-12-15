import type { JSX } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { toggleFavorite } from '../../store/action';
import type { FullOffer } from '../../types/offer.ts';

interface Props {
  offer: FullOffer;
  onCardHover?: (id: string | undefined) => void;
  cardType?: 'cities' | 'favorites' | 'near-places';
}

function CitiesCard({ offer, onCardHover, cardType = 'cities' }: Props): JSX.Element {
  const dispatch = useAppDispatch();
  const [isActive, setIsActive] = useState(false);

  const handleMouseEnter = () => {
    setIsActive(true);
    if (onCardHover) {
      onCardHover(offer.id);
    }
  };

  const handleMouseLeave = () => {
    setIsActive(false);
    if (onCardHover) {
      onCardHover(undefined);
    }
  };

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(offer.id));
  };

  const cardClass = cardType === 'favorites' 
    ? 'favorites__card place-card' 
    : cardType === 'near-places'
      ? 'near-places__card place-card'
      : `cities__card place-card ${isActive ? 'place-card--active' : ''}`;

  const imageWrapperClass = cardType === 'favorites' 
    ? 'favorites__image-wrapper place-card__image-wrapper'
    : 'cities__image-wrapper place-card__image-wrapper';

  return (
    <article
      className={cardClass}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {offer.isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={imageWrapperClass}>
        <Link to={`/offer/${offer.id}`}>
          <img
            className="place-card__image"
            src={offer.images[0]}
            width={cardType === 'favorites' ? "150" : "260"}
            height={cardType === 'favorites' ? "110" : "200"}
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button 
            className={`place-card__bookmark-button button ${offer.isFavorite ? 'place-card__bookmark-button--active' : ''}`}
            type="button"
            onClick={handleFavoriteClick}
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${offer.rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`/offer/${offer.id}`}>{offer.title}</Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default CitiesCard;