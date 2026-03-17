import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../components/header/header';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../const';

const fakeUserInfo = {
  id: 'user-1',
  email: 'test@example.com',
  username: 'Test User',
  avatar: 'https://example.com/avatar.jpg',
  isPro: false,
};

describe('Header — неавторизованный пользователь', () => {
  it('отображает ссылку Sign in', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('не отображает Sign out', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    expect(screen.queryByText(/Sign out/i)).not.toBeInTheDocument();
  });
});

describe('Header — авторизованный пользователь', () => {
  it('отображает email пользователя', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument();
  });

  it('отображает кнопку Sign out', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('не отображает ссылку Sign in', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.queryByText(/Sign in/i)).not.toBeInTheDocument();
  });
});