import { useState } from 'react';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from 'react-router-dom';
import { postNewCupom } from '../../services/apiService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';

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

const CenteredButton = styled(Button)(() => ({
  alignSelf: 'center',
}));

export default function CadastroCupom() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    valor: '',
    formaPagamento: '',
    tempoDuracao: '', 
  });
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSuccessClose = () => {
    setOpenSuccess(false);
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await postNewCupom(formData);
      setOpenSuccess(true);
      const { qrCode, codigo } = response;
      navigate(`/createdCode`, {
        state: {
          qrCode: qrCode,
          codigo: codigo,
          tempoDuracao: formData.tempoDuracao,
          nome: formData.nome,
          cpf: formData.cpf,
          valor: formData.valor,
          formaPagamento: formData.formaPagamento,
        },
      });
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
            minHeight: '400px', 
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
          <Title>Cadastro de Cupom</Title>
          <InputContainer>
            <TextField
              label="Nome"
              variant="outlined"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Joao da Silva"
            />
            <TextField
              label="CPF"
              variant="outlined"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
            />
            <TextField
              label="Valor"
              variant="outlined"
              name="valor"
              value={formData.valor}
              onChange={handleChange}
              placeholder="99,12"
            />
            <RadioGroup
            aria-label="forma-pagamento"
            defaultValue="reais"
            name="formaPagamento"
            value={formData.formaPagamento}
            onChange={handleChange}
          >
            <Stack direction="row">
              <FormControlLabel value="reais" control={<Radio />} label="Reais" />
              <FormControlLabel value="porcentagem" control={<Radio />} label="%" />
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
                value={formData.tempoDuracao}
                onChange={handleChange}
                sx={{ marginBottom: 1 }}
              />
            </InputContainer>
          </InputContainer>
          <CenteredButton variant="contained" color="primary" onClick={handleSubmit}>
            Cadastrar
          </CenteredButton>
        </Paper>
      </Stack>
      <Snackbar open={openSuccess} autoHideDuration={2500} onClose={handleSuccessClose}>
        <Alert onClose={handleSuccessClose} severity="success" sx={{ width: '100%' }}>
          Cupom cadastrado com sucesso!
        </Alert>
      </Snackbar>
      <Snackbar open={openError} autoHideDuration={2500} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          Erro ao cadastrar o cupom. Por favor, tente novamente.
        </Alert>
      </Snackbar>
    </Box>
  );
}
