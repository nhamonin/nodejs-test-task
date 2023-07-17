import React, { useState, createContext, useEffect } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  accessToken: string;
  userId: string | null;
  setLoggedIn: (value: boolean) => void;
  setAccessToken: (value: string) => void;
  setUserId: (value: string) => void;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token') || '';
    const id = localStorage.getItem('user_id') || '';

    if (token) {
      setIsLoggedIn(true);
      setAccessToken(token);
      setUserId(id);
    }

    setIsLoading(false);
  }, []);

  const handleSetLoggedIn = (value: boolean) => {
    setIsLoggedIn(value);
  };

  const handleSetAccessToken = (value: string) => {
    setAccessToken(value);
    localStorage.setItem('access_token', value);
  };

  const handleSetUserId = (value: string) => {
    setUserId(value);
    localStorage.setItem('user_id', value);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken('');
    setUserId('');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
  };

  const authContextValue: IAuthContext = {
    isLoggedIn,
    accessToken,
    userId,
    setLoggedIn: handleSetLoggedIn,
    setAccessToken: handleSetAccessToken,
    setUserId: handleSetUserId,
    logout: handleLogout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
