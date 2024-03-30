import { useState } from 'react';
import { Container, Typography, TextField, Button, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/AuthService';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response =  await login(email, senha);
      if(response){
        window.location.reload()
      }
     
    } catch (error) {
      console.error('erro ao fazer login', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to left, #203b62, #0f2646)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          padding: '32px',
          border: '1px solid #ccc',
          borderRadius: '10px',
          backgroundColor: '#f7f7f7', 
        }}
      >
        <Typography variant="h5" gutterBottom>
          Faça login
        </Typography>
        <img style={{ width: '150px' }} src="src\assets\image.png" alt="Logo" />
        <TextField
          style={{ width: '300px', maxWidth: '100%' }}
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          style={{ width: '300px', maxWidth: '100%' }}
          label="Senha"
          variant="outlined"
          type="senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <Button
          style={{
            padding: '16px 32px',
            backgroundColor: '#007bff',
            color: '#fff',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '300px',
            maxWidth: '100%',
          }}
          variant="contained"
          onClick={handleSubmit}
        >
          {loading ? <CircularProgress color="inherit" size={24} /> : 'Login'}
        </Button>
      </div>
    </Container>
  );
};

export default Login;
