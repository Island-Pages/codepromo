import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(to left, #203b62, #0f2646); /* Fundo azul escuro */
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #f7f7f7; /* Caixa branca */
`;

const Logo = styled.img`
  width: 150px;
`;

const Input = styled.input`
  padding: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 300px;
  max-width: 100%;
`;

const Button = styled.button`
  padding: 15px 30px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 300px;
  max-width: 100%;
`;

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aqui você pode adicionar a lógica de autenticação

    // Após o login bem-sucedido, redirecione para /Home
    navigate('/home');
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <Logo src="src\assets\image.png" alt="Logo" />
        <Input type="text" placeholder="Matrícula" />
        <Input type="password" placeholder="Senha" />
        <Button type="submit">Login</Button>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
