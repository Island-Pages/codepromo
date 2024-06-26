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
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { postNewCupom } from '../../services/apiService';

const Title = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
  fontFamily: 'Arial',
}));

const InputContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
}));

const CenteredButton = styled(Button)(() => ({
  alignSelf: 'center',
  marginTop: '1rem'
}));

export default function CadastroCupom() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    valor: '',
    formaPagamento: 'reais',
    tempoDuracao: '',
  });
  const [openError, setOpenError] = useState(false);
  const [cupomEspecial, setCupomEspecial] = useState(false);
  const navigate = useNavigate();

  const handleChange = (event: any) => {
    const { name, value } = event.target;

    // Formatação do CPF
    if (name === 'cpf') {
      const formattedValue = value
        .replace(/\D/g, '') 
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2') 
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2'); 
      setFormData({
        ...formData,
        [name]: formattedValue,
      });
    } else if (name === 'formaPagamento') {
      if (value === 'cupomEspecial') {
        setCupomEspecial(true);
        setFormData({
          ...formData,
          [name]: value,
          valor: '', 
        });
      } else {
        setCupomEspecial(false);
        setFormData({
          ...formData,
          [name]: value,
          valor: value === 'porcentagem' ? '' : '', 
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleErrorClose = () => {
    setOpenError(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await postNewCupom(formData);
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

  const handleValueChange = (event: any) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === '') {
      setFormData({
        ...formData,
        valor: value,
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', backgroundColor: '#FBFBFF' }}>
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
          <Title>Cadastro de Cupom</Title>
          <InputContainer>
            <TextField
              label="Nome *"
              variant="outlined"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Joao da Silva"
            />
            <TextField
              label="CPF *"
              variant="outlined"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder="000.000.000-00"
              inputProps={{ maxLength: 14 }}
            />
            {cupomEspecial ? (
              <TextField
                label="Cupom Especial *"
                variant="outlined"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                placeholder="Descreva o cupom especial"
              />
            ) : (
              <TextField
                label="Valor *"
                variant="outlined"
                name="valor"
                value={formData.valor}
                onChange={handleValueChange}
                placeholder={formData.formaPagamento === 'porcentagem' ? '15%' : '44,99'}
              />
            )}
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
                <FormControlLabel value="cupomEspecial" control={<Radio />} label="Cupom Especial" onChange={() => setCupomEspecial(!cupomEspecial)} />
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
          <CenteredButton variant="contained" color="primary" onClick={handleSubmit} sx={{ bgcolor: '#FFCB47', color: 'black',  '&:hover': { bgcolor: '#003049', color: 'white' } }}>
            Cadastrar
          </CenteredButton>
        </Paper>
      </Stack>
      <Snackbar open={openError} autoHideDuration={2500} onClose={handleErrorClose}>
        <Alert onClose={handleErrorClose} severity="error" sx={{ width: '100%' }}>
          Erro ao cadastrar o cupom. Por favor, tente novamente.
        </Alert>
      </Snackbar>
    </Box>
  );
}
