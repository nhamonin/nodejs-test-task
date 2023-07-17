import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Form from '../components/Form';

const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const handleRegisterSuccess = () => {
    navigate('/login');
  };

  return (
    <Form
      fields={[
        { name: 'username', type: 'text', label: 'Username', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        {
          name: 'password',
          type: 'password',
          label: 'Password',
          required: true,
        },
      ]}
      endpoint="http://localhost:3000/users/register"
      buttonLabel="Register"
      onSuccess={handleRegisterSuccess}
    />
  );
};

export default Register;
