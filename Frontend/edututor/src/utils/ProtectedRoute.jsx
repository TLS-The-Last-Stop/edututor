import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/Loading.jsx';
import { verifyAuth } from './auth.js';
import { useAuth } from './AuthContext.jsx';

const ProtectedRoute = ({ children, requiredRole = 'ST' }) => {
  const [isAuthorized, setIsAuthoriozed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAlerted, setHasAlerted] = useState(false);

  const { userInfo, setUserRole } = useAuth();
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      if (!userInfo) {
        navigate('/login', {
          replace: true,
          state  : { from: location.pathname }
        });
        return;
      }

      const result = await verifyAuth();
      const role = result.data;
      setUserRole(role);

      if (role !== requiredRole && !hasAlerted) {
        setHasAlerted(true);
        alert('권한이 없습니다.');
        navigate('/');
        return;
      }

      setIsAuthoriozed(true);
    } catch (error) {
      console.error('Auth check error failed:', error);
      navigate('/login', {
        replace: true,
        state  : { from: location.pathname }
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, [userInfo]);

  if (isLoading) return <Loading />;

  return isAuthorized ? children : null;
};

export default ProtectedRoute;