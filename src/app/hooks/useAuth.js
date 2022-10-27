import { useContext } from 'react';
import AuthContext from 'app/contexts/JWTAuthContext';

const useAuth = () => useContext(AuthContext);
//console.log(AuthContext);
export default useAuth;
