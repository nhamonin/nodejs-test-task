import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../contexts/AuthProvider';
import Form from '../components/Form';

const Register = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  if (!authContext) {
    return null;
  }

  const handleRegisterSuccess = () => {
    toast.success('Account created successfully!', {
      position: toast.POSITION.TOP_CENTER,
    });

    setTimeout(() => {
      navigate('/login');
    }, 3000);
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
      endpoint="/api/users/register"
      buttonLabel="Register"
      onSuccess={handleRegisterSuccess}
    />
  );
};

export default Register;
