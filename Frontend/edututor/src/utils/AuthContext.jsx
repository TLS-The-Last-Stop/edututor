import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from '../api/user/user.js';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyAuth } from './auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getUserInfo());
  const [userRole, setUserRole] = useState('');

  const navigator = useNavigate();
  const location = useLocation();

  const verifyUserRole = async () => {
    try {
      if (location.pathname === '/admin/login' ||
        location.pathname === '/login' ||
        location.pathname === '/teacher-login' ||
        location.pathname === '/student-login') {
        return;
      }

      const result = await verifyAuth();
      if (result.data === 'AD') setUserRole('AD');
      else setUserRole(result.data);

      if (result.status === 401 && result.message.startsWith('로그인')) {
        clearLocalStorage();
        navigator('/');
        return;
      }

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
  }, []);

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