import React, { useState, createContext, useEffect } from 'react';

interface IAuthContext {
  isLoggedIn: boolean;
  accessToken: string;
  setLoggedIn: (value: boolean) => void;
  setAccessToken: (value: string) => void;
}

export const AuthContext = createContext<IAuthContext | null>(null);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [accessToken, setAccessToken] = useState<string>('');

  useEffect(() => {
    const token = window.localStorage.getItem('access_token');

    if (!token) return;

    setIsLoggedIn(true);
    setAccessToken(token);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        accessToken,
        setLoggedIn: setIsLoggedIn,
        setAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
