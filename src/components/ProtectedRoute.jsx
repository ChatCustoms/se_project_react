import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element: Component, loggedIn }) => {
  return loggedIn ? <Component /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
