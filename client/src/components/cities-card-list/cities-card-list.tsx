import type { JSX } from 'react';
import CitiesCard from '../cities-card/cities-card';
import type { FullOffer } from '../../types/offer.ts';

interface Props {
  offers: FullOffer[];
  onCardHover?: (id: string | undefined) => void;
}

function CitiesCardList({ offers, onCardHover }: Props): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <CitiesCard
          key={offer.id}
          offer={offer}
          onCardHover={onCardHover}
        />
      ))}
    </div>
  );
}

export default CitiesCardList;