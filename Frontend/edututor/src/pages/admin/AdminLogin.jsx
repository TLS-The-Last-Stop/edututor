import styled from 'styled-components';
import { useState } from 'react';
import { login } from '../../api/user/user.js';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
`;

const LoginCard = styled.div`
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h3`
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
    margin-bottom: 2rem;
    color: #111827;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const Label = styled.label`
    font-size: 0.875rem;
    font-weight: 500;
    color: #374151;
`;

const Input = styled.input`
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 0.875rem;

    &:focus {
        outline: none;
        border-color: #2563eb;
        box-shadow: 0 0 0 1px #2563eb;
    }
`;

const Button = styled.button`
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #2563eb;
    color: white;
    border: none;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #1d4ed8;
    }

    &:focus {
        outline: none;
        box-shadow: 0 0 0 2px #white, 0 0 0 4px #2563eb;
    }
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const submitData = {
      ...form,
      type: 'AD'
    };

    const result = login(submitData);
    if (result) navigate('/admin');
  };

  return (
    <Container>
      <LoginCard>
        <Title>관리자 로그인</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="loginId">아이디</Label>
            <Input
              id="loginId"
              name="loginId"
              value={form.loginId}
              onChange={handleChange}
              required
              placeholder="아이디를 입력해주세요"
            />

            <Label htmlFor="loginId">비밀번호</Label>
            <Input
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="비밀번호를 입력해주세요"
            />

            <Button>로그인</Button>
          </InputGroup>
        </Form>
      </LoginCard>
    </Container>
  );
};

export default AdminLogin;