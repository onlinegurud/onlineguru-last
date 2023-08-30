import useAuth from 'app/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import AuthContext from 'app/contexts/JWTAuthContext';

import MatxLayout4 from '../components/MatxLayout4/MatxLayout';

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const { pathname } = useLocation();
  const { user } = useAuth();

  return (
    <div>
      {isAuthenticated && children}
      {console.log(isAuthenticated,"😊")}
      {isAuthenticated && <Navigate to="/session/signin" state={{ from: pathname }} />}
    </div>
  );
};

export default AuthGuard;
