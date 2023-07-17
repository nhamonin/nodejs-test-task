import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Logout = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setAccessToken, setLoggedIn } = authContext;

  useEffect(() => {
    localStorage.removeItem('access_token');
    setAccessToken('');
    setLoggedIn(false);
    navigate('/login');
  }, [setAccessToken, setLoggedIn, navigate]);

  return null;
};

export default Logout;
