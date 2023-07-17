import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

import Form from '../components/Form';
import Loading from '../components/Loading';

const Account = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);

  const { isLoggedIn, isLoading } = authContext || {};

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      navigate('/login');
    }
  }, [isLoggedIn, isLoading, navigate]);

  if (isLoading) {
    return <Loading />;
  }

  const handleAccountUpdateSuccess = () => {
    console.log('Account updated successfully!');
  };

  return (
    <Form
      fields={[
        { name: 'username', type: 'text', label: 'Username' },
        { name: 'email', type: 'email', label: 'Email' },
        { name: 'avatar', type: 'file', label: 'Avatar File' },
      ]}
      endpoint="http://localhost:3000/api/update-account"
      buttonLabel="Update Account"
      onSuccess={handleAccountUpdateSuccess}
      multipart
    />
  );
};

export default Account;
