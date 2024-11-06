import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/Loading.jsx';
import { verifyAuth } from './auth.js';
import { useAuth } from './AuthContext.jsx';

const ProtectedRoute = ({ children, requiredRole = 'SU' }) => {
  const [isAuthorized, setIsAuthoriozed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAlerted, setHasAlerted] = useState(false);

  const { userInfo, userRole } = useAuth();
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      if (requiredRole === 'AD') {
        const result = await verifyAuth();
        const isAD = result.data === 'AD';
        setIsAuthoriozed(isAD);

        if (!isAD && !hasAlerted) {
          setHasAlerted(true);
          alert('관리자 권한이 필요합니다.');
          navigate('/');
        }
        return;
      }

      if (!userInfo) {
        navigate('/login', {
          replace: true,
          state  : { from: location.pathname }
        });
        return;
      }

      const result = await verifyAuth();
      const role = result.data;

      // 권한 계층 체크
      const hasRequiredRole = (required, actual) => {
        if (actual === 'AD') return true;
        if (actual === 'TE' && required === 'SU') return true;
        return actual === required;
      };

      if (!hasRequiredRole(requiredRole, role) && !hasAlerted) {
        setHasAlerted(true);
        alert('죄송합니다.');
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
  }, [userInfo, userRole]);

  if (isLoading) return <Loading />;

  return isAuthorized ? children : null;
};

export default ProtectedRoute;