import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from '../api/user/user.js';
import privateApi from '../api/axios.js';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(getUserInfo());
  const [userRole, setUserRole] = useState('');
  const navigator = useNavigate();

  const verifyUserRole = async () => {
    try {
      if (!userInfo) return;

      const response = await privateApi.get('/auth/verify');
      if (response.data.status === 401 && response.data.message.startsWith('로그인')) {
        clearLocalStorage();
        navigator('/');
        return;
      }

      setUserRole(response.data.data);
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