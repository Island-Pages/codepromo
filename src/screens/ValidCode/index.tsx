import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { Alert, FormControlLabel, IconButton, Radio, RadioGroup, Snackbar } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { patchValidarCupom } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';

// Estilo para o título
const Title = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));


const CenteredButton = styled(Button)(({}) => ({
  alignSelf: 'center',
}));


// Estilo para o container do Giphy
const GiphyContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

export default function ValidCode() {
  const location = useLocation();
  const { nome, cpf, valor, formaPagamento, id } = location.state;

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleSubmit = async () => {
    try {
      console.log(id)
      await patchValidarCupom(id);
      navigate('/Home');
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setOpenError(true);
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
          <Title>Dados do Cupom</Title>
          <GiphyContainer>
            <ThumbUpIcon fontSize="large" color="primary" />
          </GiphyContainer>
          <TextField label="Nome" variant="outlined" value={nome} disabled />
          <TextField label="CPF" variant="outlined" value={cpf} disabled />
          <TextField label="Valor" variant="outlined" value={valor} disabled />
          <RadioGroup aria-label="forma-pagamento" defaultValue="reais" name="formaPagamento" value={formaPagamento}>
            <Stack direction="row">
              <FormControlLabel value="reais" control={<Radio />} label="Reais" />
              <FormControlLabel value="porcentagem" control={<Radio />} label="%" />
            </Stack>
          </RadioGroup>
          <CenteredButton variant="contained" color="primary" onClick={handleSubmit}>
            Verificar Cupom
          </CenteredButton>
        </Paper>
      </Stack>
      <Snackbar open={openSuccess} autoHideDuration={2500} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Cupom validado com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={2500} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          Erro ao validar o cupom. Por favor, tente novamente.
        </Alert>
      </Snackbar>
    </Box>
  );
}
