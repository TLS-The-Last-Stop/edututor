import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const encodedData = searchParams.get('data');
    if (encodedData) {
      try {
        const base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');
        const decodedString = new TextDecoder('utf-8').decode(Uint8Array.from(atob(base64), c => c.charCodeAt(0)));
        localStorage.setItem('info', decodedString);
        dispatchEvent(new Event('auth-update'));
      } catch (error) {
        console.error('Decoding failed:', error);
      }
    }
    navigate('/');
  }, []);

  return <div>로그인 중...</div>;
};

export default OAuthSuccess;