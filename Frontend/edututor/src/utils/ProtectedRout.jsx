import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/common/Loading.jsx';
import { verifyAuth } from './auth.js';

const ProtectedRout = ({ children }) => {
  const [isAuthorized, setIsAuthoriozed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuth = async () => {
    try {
      const result = await verifyAuth();

      if (result.status === 200) setIsAuthoriozed(true);
      else if (result.status === 404) navigate('/login');
    } catch (error) {
      console.error('Auth check error failed:', error);
      navigate('/login', {
        replace: true,
        state  : { from: window.location.pathname }
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (isLoading) return <Loading />;

  return isAuthorized ? children : null;
};

export default ProtectedRout;