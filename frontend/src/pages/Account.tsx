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
        { name: 'avatar', type: 'file', label: 'Avatar URL' },
      ]}
      endpoint="http://localhost:3000/api/update-account" // Update the endpoint with the appropriate API route for updating account data
      buttonLabel="Update Account"
      onSuccess={handleAccountUpdateSuccess}
    />
  );
};

export default Account;
