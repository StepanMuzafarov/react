import type { JSX } from 'react';

function LoadingScreen(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <img className="header__logo" src="/img/logo.svg" alt="Rent service logo" width="81" height="41" />
            </div>
          </div>
        </div>
      </header>
      <main className="page__main page__main--index">
        <div className="cities">
          <div className="cities__places-container container">
            <div className="cities__status-wrapper">
              <b className="cities__status">Loading...</b>
              <p className="cities__status-description">
                Please wait while we load the offers
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LoadingScreen;