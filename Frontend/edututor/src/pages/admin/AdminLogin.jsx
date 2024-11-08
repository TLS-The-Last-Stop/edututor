import { useState } from 'react';
import { login } from '../../api/user/user.js';
import { useNavigate } from 'react-router-dom';
import AdminLoginForm from '../../components/admin/AdminLoginForm.jsx';
import { Container, FormSection, LoginTypeContainer } from '../../components/common/UserStyledComponents.js';

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
      <FormSection>
        <LoginTypeContainer>
          <AdminLoginForm
            formData={formData}
            errors={errors}
            handleSubmit={handleSubmit}
            handleInputChange={handleInputChange}
          />
        </LoginTypeContainer>
      </FormSection>
    </Container>
  );
};

export default AdminLogin;