import type { JSX } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import {
  getAuthorizationStatus,
  getOffersLoadingStatus
} from '../../store/selectors';
import { LoadingPage } from '../loading-page/loading-page';
import { ErrorMessage } from '../error-message/error-message';
import { LoginPage } from '../../pages/login-page/login-page';
import { MainPage } from '../../pages/main-page/main-page';
import { OfferPage } from '../../pages/offer-page/offer-page';
import { FavoritesPage } from '../../pages/favorites-page/favorites-page';
import { NotFoundPage } from '../../pages/not-found-page/not-found-page';
import { checkAuthAction, fetchOffersAction } from '../../store/api-actions';
import { Header } from '../header/header';

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingPage />;
  }
  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={AppRoute.Login} replace />;
  }
  return children;
}

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, [dispatch]);


  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <LoadingPage />;
  }


  return (
    <BrowserRouter>
      <ErrorMessage />
      <div className="page page--gray page--main">
        <Header />
        <Routes>
          <Route path={AppRoute.Main} element={<MainPage />} />
          <Route
            path={AppRoute.Login}
            element={
              authorizationStatus === AuthorizationStatus.NoAuth
                ? <LoginPage />
                : <Navigate to={AppRoute.Main} replace />
            }
          />
          <Route path={AppRoute.Offer} element={<OfferPage />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route path={AppRoute.NotFound} element={<NotFoundPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export { App };