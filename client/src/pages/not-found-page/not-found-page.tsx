import type { JSX } from 'react';
import { Link } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect } from 'react';

function NotFoundPage(): JSX.Element {

  useEffect(() => {
    console.error(`404 - Page not found\nURL: ${window.location.pathname}`);
  }, []);

  return (
    <div className="page page--gray">
      <main className="page__main page__main--index-empty">
        <div className="cities__status-wrapper">
          <b className="cities__status">404</b>
          <p className="cities__status-description">
            Страница не найдена
          </p>
          <Link to={AppRoute.Main} className="button places__sorting-type">
            Вернуться на главную
          </Link>
        </div>
      </main>
    </div>
  );
}

export { NotFoundPage };