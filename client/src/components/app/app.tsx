import type { JSX } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import PrivateRoute from '../private-route/private-route';
import { RENTAL_OFFERS_COUNT, AppRoute, AuthorizationStatus } from '../../const';
import type { FullOffer } from '../../types/offer';

interface AppProps {
  offers: FullOffer[];
}

function App({ offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
          path={AppRoute.Main} 
          element={<MainPage rentalOffersCount={RENTAL_OFFERS_COUNT} offers={offers} />} 
        />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route 
          path={AppRoute.Favorites} 
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          } 
        />
        <Route path={AppRoute.Offer} element={<OfferPage offers={offers} />} />
        <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
