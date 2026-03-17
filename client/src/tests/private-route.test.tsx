import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from '../components/private-route/private-route';
import { AuthorizationStatus, AppRoute } from '../const';
import { renderWithProviders } from './render-with-providers';

describe('PrivateRoute', () => {
  it('показывает дочерний компонент для авторизованного пользователя', () => {
    renderWithProviders(
      <PrivateRoute>
        <div data-testid="protected">Избранное</div>
      </PrivateRoute>,
      {
        storeOverrides: {
          authorizationStatus: AuthorizationStatus.Auth,
        },
        initialEntries: [AppRoute.Favorites],
      }
    );
    expect(screen.getByTestId('protected')).toBeInTheDocument();
  });

  it('перенаправляет на /login для неавторизованного пользователя', () => {
    renderWithProviders(
      <Routes>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <div data-testid="protected">Избранное</div>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<div data-testid="login-page">Страница входа</div>}
        />
      </Routes>,
      {
        storeOverrides: {
          authorizationStatus: AuthorizationStatus.NoAuth,
        },
        initialEntries: [AppRoute.Favorites],
      }
    );
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('перенаправляет на /login при статусе Unknown', () => {
    renderWithProviders(
      <Routes>
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <div data-testid="protected">Избранное</div>
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Login}
          element={<div data-testid="login-page">Страница входа</div>}
        />
      </Routes>,
      {
        storeOverrides: {
          authorizationStatus: AuthorizationStatus.Unknown,
        },
        initialEntries: [AppRoute.Favorites],
      }
    );
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});