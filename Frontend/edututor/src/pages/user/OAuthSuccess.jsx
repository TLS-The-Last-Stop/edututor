import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const encodedData = searchParams.get('data');
    if (encodedData) {
      const decoder = new TextDecoder('utf-8');
      const bytes = new Uint8Array(atob(encodedData).split('').map(c => c.charCodeAt(0)));

      const decodedData = decoder.decode(bytes);  // Base64 디코딩

      localStorage.setItem('info', decodedData);
      window.dispatchEvent(new Event('auth-update'));
    }
    navigate('/');
  }, []);

  return <div>로그인 중...</div>;
};

export default OAuthSuccess;