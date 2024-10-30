import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from './auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getUserInfo());

  useEffect(() => {
    const handleStorageChange = () => {
      const currentInfo = getUserInfo();
      setUserInfo(currentInfo);
    };

    window.addEventListener('storage', handleStorageChange);

    window.addEventListener('auth-update', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('auth-update', handleStorageChange);
    };
  }, []);

  const updateUserInfo = () => {
    setUserInfo(getUserInfo());

    window.dispatchEvent(new Event('auth-update'));
  };

  return (
    <AuthContext.Provider value={{ userInfo, updateUserInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);