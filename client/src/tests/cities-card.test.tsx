import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import CitiesCard from '../components/cities-card/cities-card';
import { makeFakeFullOffer } from './mocks';

describe('CitiesCard', () => {
  const offer = makeFakeFullOffer();

  const renderCard = (offerData = offer) =>
    render(
      <MemoryRouter>
        <CitiesCard offer={offerData} />
      </MemoryRouter>
    );

  it('заголовок объявления отображается на карточке', () => {
    renderCard();
    expect(screen.getByText(offer.title)).toBeInTheDocument();
  });

  it('цена объявления присутствует в разметке', () => {
    renderCard();
    expect(screen.getByText(`€${offer.price}`)).toBeInTheDocument();
  });

  it('метка "Premium" отображается когда isPremium = true', () => {
    const premiumOffer = { ...offer, isPremium: true };
    renderCard(premiumOffer);
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('метка "Premium" отсутствует когда isPremium = false', () => {
    const nonPremiumOffer = { ...offer, isPremium: false };
    renderCard(nonPremiumOffer);
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('ссылка на страницу объявления содержит id в href (/offer/id)', () => {
  renderCard();
  const heading = screen.getByRole('heading', { name: offer.title });
  const link = within(heading).getByRole('link');
  expect(link).toHaveAttribute('href', `/offer/${offer.id}`);
});
});