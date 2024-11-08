import styled from 'styled-components';
import { useState } from 'react';
import { login } from '../../api/user/user.js';
import { useNavigate } from 'react-router-dom';
import AdminLoginForm from '../../components/admin/AdminLoginForm.jsx';

const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
`;

const initForm = {
  loginId : '',
  password: '',
  type    : 'AD'
};

const initErrors = {
  loginId : '',
  password: ''
};

const AdminLogin = () => {
  const [formData, setFormData] = useState(initForm);
  const [errors, setErrors] = useState(initErrors);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.loginId) {
      setErrors(prev => ({
        ...prev,
        loginId: '아이디를 입력해주세요.'
      }));
      return;
    }

    if (!formData.password) {
      setErrors(prev => ({
        ...prev,
        password: '비밀번호를 입력해주세요.'
      }));
      return;
    }

    try {
      const result = await login(formData);
      if (result) navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <AdminLoginForm
        formData={formData}
        errors={errors}
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
      />
    </Container>
  );
};

export default AdminLogin;