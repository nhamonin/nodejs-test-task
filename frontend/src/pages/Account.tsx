import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { AuthContext } from '../contexts/AuthProvider';
import Form from '../components/Form';
import Loading from '../components/Loading';

interface User {
  username: string;
  email: string;
  avatar: string;
}

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const Account = () => {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const { isLoggedIn, isLoading, userId } = authContext || {};

  const [userData, setUserData] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn && !isLoading) {
      navigate('/login');
    }
  }, [isLoggedIn, isLoading]);

  useEffect(() => {
    const fetchUserData = async () => {
      setUserLoading(true);
      try {
        const response = await fetch(`${BACKEND_URL}/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${authContext?.accessToken || ''}`,
          },
        });
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setUserLoading(false);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  if (isLoading || userLoading) {
    return <Loading />;
  }

  const handleAccountUpdateSuccess = () => {
    toast.success('Account updated successfully!', {
      position: toast.POSITION.TOP_CENTER,
    });
  };

  return (
    <Form
      fields={[
        {
          name: 'username',
          type: 'text',
          label: 'Username',
          value: userData?.username || '',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
          value: userData?.email || '',
        },
        { name: 'password', type: 'password', label: 'Password' },
        { name: 'avatar', type: 'file', label: 'Avatar File' },
      ]}
      endpoint={`${BACKEND_URL}/users/${userId}`}
      buttonLabel="Update Account"
      onSuccess={handleAccountUpdateSuccess}
      method="PUT"
      multipart
      token={authContext?.accessToken}
    />
  );
};

export default Account;
