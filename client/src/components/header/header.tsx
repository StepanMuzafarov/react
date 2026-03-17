import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { AppRoute, AuthorizationStatus } from '../../const';
import { logoutAction } from '../../store/api-actions';
import { getImageUrl } from '../../utils';
import { Logo } from '../logo/logo';
import { 
  getUserEmail, 
  getUserAvatar, 
  getOffers,
  getAuthorizationStatus 
} from '../../store/selectors';

export function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userEmail = useAppSelector(getUserEmail);
  const userAvatar = useAppSelector(getUserAvatar);
  const allOffers = useAppSelector(getOffers);

  const favoritesCount = allOffers.filter((o) => o.isFavorite).length;
  const isAuth = authorizationStatus === AuthorizationStatus.Auth;

  const handleLogout = () => {
    dispatch(logoutAction());
  }; 

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth ? (
                <>
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
                          {userEmail || 'Пользователь'}
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
                </>
              ) : (
                <li className="header__nav-item">
                  <Link
                    className="header__nav-link"
                    to={AppRoute.Login}
                  >
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}