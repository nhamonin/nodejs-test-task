import React, { useState, createContext, useEffect } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  accessToken: string;
  setLoggedIn: (value: boolean) => void;
  setAccessToken: (value: string) => void;
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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (token) {
      setIsLoggedIn(true);
      setAccessToken(token);
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

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAccessToken('');
    localStorage.removeItem('access_token');
  };

  const authContextValue: IAuthContext = {
    isLoggedIn,
    accessToken,
    setLoggedIn: handleSetLoggedIn,
    setAccessToken: handleSetAccessToken,
    logout: handleLogout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
