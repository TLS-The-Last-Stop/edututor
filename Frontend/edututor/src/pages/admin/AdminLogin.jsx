import styled from 'styled-components';
import { useState } from 'react';
import { login } from '../../api/user/user.js';
import { useNavigate } from 'react-router-dom';
import AdminLoginForm from '../../components/admin/AdminLoginForm.jsx';

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
`;


const initForm = {
  loginId : '',
  password: '',
  type    : 'AD'
};

const AdminLogin = () => {
  const [form, setForm] = useState(initForm);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submitData = {
      ...form,
      type: 'AD'
    };

    try {
      const result = await login(submitData);
      if (result) navigate('/admin');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <Container>
      <AdminLoginForm
        form={form}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
    </Container>
  );
};

export default AdminLogin;