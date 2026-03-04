import type { JSX } from 'react';
import './loading-page.css';

function LoadingPage(): JSX.Element {
  return (
    <div className="loading-page">
      <div className="loading-spinner">Загрузка...</div>
    </div>
  );
}

export { LoadingPage };