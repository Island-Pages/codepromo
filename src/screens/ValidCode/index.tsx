import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { Alert, FormControlLabel, IconButton, Radio, RadioGroup, Snackbar, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
  fontFamily: 'Arial',
}));

const CenteredButton = styled(Button)(({}) => ({
  alignSelf: 'center',
  marginTop: '1rem'
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

export default function ValidCode() {
  const location = useLocation();
  const { nome, cpf, valor, formaPagamento, id, tempoDuracao } = location.state;

  const dataFormatada = new Date(tempoDuracao).toISOString().split('T')[0];

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
            padding: 5,
            maxWidth: '90%',
            minHeight: '4rem',
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
          <Title>Dados do Cupom</Title>
          <InputContainer>
            <TextField
              label="Nome"
              variant="outlined"
              name="nome"
              value={nome}
              disabled={true}
            />
            <TextField
              label="CPF"
              variant="outlined"
              name="cpf"
              value={cpf}
              disabled={true}
            />
            <TextField
              label="Valor"
              variant="outlined"
              name="valor"
              value={valor}
              disabled={true}
            />
            <RadioGroup
            aria-label="forma-pagamento"
            defaultValue="reais"
            name="formaPagamento"
            value={formaPagamento}
          >
            <Stack direction="row">
              <FormControlLabel value="reais" control={<Radio />} label="Reais" />
              <FormControlLabel value="porcentagem" control={<Radio />} label="%" />
              <FormControlLabel value="cupomEspecial" control={<Radio />} label="Cupom Especial" />
            </Stack>
          </RadioGroup>
            <InputContainer>
              <Typography variant="body1" color="textSecondary">
                Selecione a data de expiração do cupom:
              </Typography>
              <TextField
                variant="outlined"
                name="tempoDuracao"
                type="date"
                value={dataFormatada}
                disabled={true}
                sx={{ marginBottom: 1 }}
              />
            </InputContainer>
          </InputContainer>
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
