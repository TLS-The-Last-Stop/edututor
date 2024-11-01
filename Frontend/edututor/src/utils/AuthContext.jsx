import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from '../api/user/user.js';
import { useNavigate } from 'react-router-dom';
import { verifyAuth } from './auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getUserInfo());
  const [userRole, setUserRole] = useState('');
  const navigator = useNavigate();

  const verifyUserRole = async () => {
    try {
      if (!userInfo) return;

      const result = await verifyAuth();

      if (result.status === 401 && result.message.startsWith('로그인')) {
        clearLocalStorage();
        navigator('/');
        return;
      }

      setUserRole(result.data);
    } catch (error) {
      console.error('Failed to verify role:', error);
      clearLocalStorage();
      navigator('/');
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('info');
    setUserInfo(null);
    setUserInfo('');
  };

  const updateUserInfo = () => {
    setUserInfo(getUserInfo());

    window.dispatchEvent(new Event('auth-update'));
  };

  useEffect(() => {
    verifyUserRole();
  }, [userInfo]);

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

  return (
    <AuthContext.Provider value={{
      userInfo,
      updateUserInfo,
      userRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);