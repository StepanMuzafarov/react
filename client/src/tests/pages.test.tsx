import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LoadingPage } from '../components/loading-page/loading-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { AppRoute } from '../const';

describe('LoadingPage', () => {
  it('отображает текст загрузки', () => {
    render(<LoadingPage />);
    expect(screen.getByText(/загрузка/i)).toBeInTheDocument();
  });

  it('компонент рендерится без ошибок', () => {
    expect(() => render(<LoadingPage />)).not.toThrow();
  });
});

describe('PageNotFound', () => {
  const renderPage = () =>
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

  it('отображает заголовок 404', () => {
    renderPage();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('отображает текст "Страница не найдена"', () => {
    renderPage();
    expect(screen.getByText(/страница не найдена/i)).toBeInTheDocument();
  });

  it('ссылка на главную страницу присутствует', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /главную/i })).toBeInTheDocument();
  });

  it('ссылка ведет на "/"', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /главную/i });
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});