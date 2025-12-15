import type { JSX } from 'react';
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fillOffers, setAuthorizationStatus, setLoadingStatus } from '../../store/action';
import { offers } from '../../mocks/offers';
import { AuthorizationStatus } from '../../const';
import MainPage from '../../pages/main-page/main-page';
import OfferPage from '../../pages/offer-page/offer-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import LoginPage from '../../pages/login-page/login-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import LoadingScreen from '../loading-screen/loading-screen';
import PrivateRoute from '../private-route/private-route';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => state.isLoading);
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoadingStatus(true));
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      dispatch(fillOffers(offers));
      dispatch(setAuthorizationStatus(AuthorizationStatus.Auth));
      dispatch(setLoadingStatus(false));
    };

    loadData();
  }, [dispatch]);

  if (isLoading || authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;