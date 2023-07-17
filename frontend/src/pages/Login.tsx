import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

import Form from '../components/Form';

const Login = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  if (!authContext) {
    return null;
  }
  const { setAccessToken, setLoggedIn } = authContext;

  const handleLoginSuccess = (accessToken: string | undefined) => {
    if (!accessToken) return;

    setAccessToken(accessToken);
    localStorage.setItem('access_token', accessToken);
    setLoggedIn(true);
    navigate('/account');
  };

  return (
    <Form
      fields={[
        { name: 'usernameOrEmail', type: 'text', label: 'Username or Email' },
        { name: 'password', type: 'password', label: 'Password' },
      ]}
      endpoint="http://localhost:3000/auth/login"
      buttonLabel="Login"
      onSuccess={handleLoginSuccess} // Pass the handler function to handle successful login
    />
  );
};

export default Login;
