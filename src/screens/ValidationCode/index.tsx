import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { postDadosCupom } from '../../services/apiService';
import Scanner from '../../Components/Scanner';

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

  const handleScanResult = (result: string) => {
    setCupomCode(result);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="column" alignItems="center">
        <Paper
          sx={{
            padding: 5,
            maxWidth: '90%',
            height: '400px',
            width: '300px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px'
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
          <Scanner onScan={handleScanResult}/>
          <CenteredButton variant="contained" color="primary" onClick={handleValidation}>
            Verificar Cupom
          </CenteredButton>
        </Paper>
      </Stack>
    </Box>
  );
}
