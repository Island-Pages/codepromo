import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { NavLink } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postDadosCupom } from '../../services/apiService';

const Title = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const CenteredButton = styled(Button)(({}) => ({
  alignSelf: 'center',
}));

const CameraArea = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

export default function ValidarCupom() {
  const [cupomCode, setCupomCode] = useState('');
  const qrCode = '';
  const navigate = useNavigate();

  const handleValidation = async () => {
    try {
      let dataToSend = {};
      
      // Verifica se o cupomCode está preenchido
      if (cupomCode) {
        dataToSend = { codigo: cupomCode };
      } else {
        // Se não estiver preenchido, verifica se o qrCode está preenchido
        if (qrCode) {
          dataToSend = { qrCode: qrCode };
        } else {
          // Se nenhum estiver preenchido, exibe um erro
          console.error('Nenhum código ou QR code fornecido');
          return;
        }
      }

      // Fazer a requisição ao backend
      const response = await postDadosCupom(dataToSend);

      // Tratar a resposta conforme necessário

      const { nome, cpf, valor, formaPagamento, _id } = response;
      // Navegar para a próxima tela, se necessário
      navigate(`/validCode`, {
        state: { nome: nome, cpf: cpf, valor: valor, formaPagamento: formaPagamento, id: _id}
      });
    } catch (error) {
      console.error('Erro ao validar cupom:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="column" alignItems="center">
        <Paper
          sx={{
            padding: 2,
            width: '400px',
            height: '400px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <NavLink to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
            <IconButton color="inherit" aria-label="Voltar" sx={{ position: 'absolute', left: '4rem', top: '6rem' }}>
              <ArrowBackIcon />
            </IconButton>
          </NavLink>
          <Title>Validar Cupom</Title>
          <InputContainer>
            <TextField
              label="Código do Cupom"
              variant="outlined"
              autoCapitalize='characters'
              value={cupomCode}
              onChange={(e) => setCupomCode(e.target.value)}
            />
          </InputContainer>
          <CameraArea>
            <CameraAltIcon fontSize="large" color="primary" />
          </CameraArea>
          <CenteredButton variant="contained" color="primary" onClick={handleValidation}>
            Verificar Cupom
          </CenteredButton>
        </Paper>
      </Stack>
    </Box>
  );
}
