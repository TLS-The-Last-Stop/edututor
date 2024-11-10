import { createContext, useContext, useEffect, useState } from 'react';
import { getUserInfo } from '../api/user/user.js';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';
import { verifyAuth } from './auth.js';

const AuthContext = createContext();

// HOC를 만들어서 navigation 로직을 분리
const AuthProviderWithNavigation = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AuthProvider navigate={navigate} location={location}>
      {children}
    </AuthProvider>
  );
};

const AuthProvider = ({ children, navigate, location }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    try {
      const info = getUserInfo(true);
      setUserInfo(info);
    } catch (error) {
      clearLocalStorage();
    }
  }, [navigate]);

  const verifyUserRole = async () => {
    try {
      const publicPathPatterns = [
        /^\/join$/,
        /^\/additional-info$/,
        /login/,
        /cmmn/
      ];

      const isPublicPath = publicPathPatterns.some(pattern =>
        pattern.test(location.pathname)
      );

      if (isPublicPath) {
        return;
      }

      const result = await verifyAuth();
      if (result.status === 401 && result.message.startsWith('로그인')) {
        clearLocalStorage();
        return;
      }

      const role = result?.data === 'AD' ? 'AD' : result.data;
      setUserRole(role);

      if (role === 'SU' && location.pathname.match(/^\/course(?:\/|$)/)) {
        navigate('/');
      }

    } catch (error) {
      console.error('Failed to verify role:', error);
      clearLocalStorage();
      navigate('/');
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem('info');
    setUserInfo(null);
    setUserRole('');
  };

  const updateUserInfo = () => {
    setUserInfo(getUserInfo());
    window.dispatchEvent(new Event('auth-update'));
  };

  useEffect(() => {
    verifyUserRole();
  }, [userInfo, location.pathname]);

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

export { AuthProviderWithNavigation as AuthProvider };