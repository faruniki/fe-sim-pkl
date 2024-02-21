// ProtectedRoute.js
import { Navigate, Route } from 'react-router-dom';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return token ? (
    <Route {...rest} element={<Component />} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default ProtectedRoute;
