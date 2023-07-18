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
  const { setAccessToken, setUserId, setLoggedIn } = authContext;

  const handleLoginSuccess = (
    accessToken: string | undefined,
    userId: string | undefined,
  ) => {
    if (!accessToken || !userId) return;

    setAccessToken(accessToken);
    setUserId(userId);
    setLoggedIn(true);
    navigate('/account');
  };

  return (
    <Form
      fields={[
        {
          name: 'usernameOrEmail',
          type: 'text',
          label: 'Username or Email',
          required: true,
        },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          required: true,
        },
      ]}
      endpoint={`${import.meta.env.VITE_BACKEND_URL}/auth/login`}
      buttonLabel="Login"
      onSuccess={handleLoginSuccess}
    />
  );
};

export default Login;
