import { Navigate } from 'react-router-dom';
import React from 'react';
import { AppRoute, AuthorizationStatus } from '../../const';

interface PrivateRouteProps {
  authorizationStatus: AuthorizationStatus;
  children: React.ReactNode;
}

function PrivateRoute({ authorizationStatus, children }: PrivateRouteProps) {
  return (
    authorizationStatus === AuthorizationStatus.Auth
      ? children
      : <Navigate to={AppRoute.Login} replace />
  );
}

export default PrivateRoute;
