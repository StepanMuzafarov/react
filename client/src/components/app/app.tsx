import type { JSX } from 'react';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { BrowserRouter, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { 
  getAuthorizationStatus, 
  getOffersLoadingStatus, 
  getUserEmail, 
  getUserAvatar,
  getOffers 
} from '../../store/selectors';
import { LoadingPage } from '../loading-page/loading-page';
import { ErrorMessage } from '../error-message/error-message';
import { LoginPage } from '../../pages/login-page/login-page';
import { MainPage } from '../../pages/main-page/main-page';
import { checkAuthAction, fetchOffersAction, logoutAction } from '../../store/api-actions';
import { getImageUrl } from '../../utils';
import { Logo } from '../logo/logo';

function ProtectedRoute({ children }: { children: JSX.Element }): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const location = useLocation();

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingPage />;
  }

  if (authorizationStatus === AuthorizationStatus.NoAuth) {
    return <Navigate to={AppRoute.Login} state={{ from: location }} replace />;
  }

  return children;
}

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);
  const userEmail = useAppSelector(getUserEmail);
  const userAvatar = useAppSelector(getUserAvatar);
  
  const allOffers = useAppSelector(getOffers);

  useEffect(() => {
    dispatch(checkAuthAction());
    dispatch(fetchOffersAction());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  if (authorizationStatus === AuthorizationStatus.Unknown || isOffersDataLoading) {
    return <LoadingPage />;
  }

  const favoritesCount = allOffers.filter((o: { isFavorite: boolean }) => o.isFavorite).length;

  return (
    <BrowserRouter>
      <ErrorMessage />
      
      <div className="page page--gray page--main">
        
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
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {userAvatar ? (
                          <img 
                            className="user__avatar"
                            src={getImageUrl(userAvatar)} 
                            alt="avatar" 
                            width={24} 
                            height={24}
                            style={{ borderRadius: '50%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className="header__avatar-wrapper user__avatar-wrapper" />
                        )}
                        
                        <span className="header__user-name user__name">
                          {userEmail || 'Гость'}
                        </span>
                      </div>
                      
                      <span className="header__favorite-count">
                        {favoritesCount}
                      </span>
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a 
                      className="header__nav-link" 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleLogout();
                      }}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <Routes>
          <Route 
            path={AppRoute.Main} 
            element={
              <ProtectedRoute>
                <MainPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path={AppRoute.Login} 
            element={
              authorizationStatus === AuthorizationStatus.NoAuth 
                ? <LoginPage /> 
                : <Navigate to={AppRoute.Main} replace />
            } 
          />
          <Route path="*" element={<Navigate to={AppRoute.Main} replace />} />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export { App };