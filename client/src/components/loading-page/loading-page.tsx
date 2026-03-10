import type { JSX } from 'react';
import './loading-page.css';

function LoadingPage(): JSX.Element {
  return (
    <div className="loading-page">
      <div className="loading-spinner">
        <div className="spinner-circle"></div>
        <p>Загрузка...</p>
      </div>
    </div>
  );
}

export { LoadingPage };