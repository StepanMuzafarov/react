import React, { type JSX } from 'react';
function NotFoundPage(): JSX.Element {
  return (
    <div className="page__main">
      <div className="container">
        <h1>404. Page not found</h1>
        <a href="/">Вернуться на главную</a>
      </div>
    </div>
  );
}

export default NotFoundPage;