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
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="column" alignItems="center">
        <Paper sx={{ padding: 2, width: '400px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <NavLink to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
            <IconButton color="inherit" aria-label="Voltar" sx={{ position: 'absolute', left: '4rem', top: '6rem' }}>
              <ArrowBackIcon />
            </IconButton>
          </NavLink>
          <Title>Cadastro de Cupom</Title>
          <InputContainer>
            <TextField label="Nome" variant="outlined" />
            <TextField label="CPF" variant="outlined" />
            <TextField label="Valor" variant="outlined" />
          </InputContainer>
          <RadioGroup aria-label="forma-pagamento" defaultValue="reais">
            <Stack direction="row">
              <FormControlLabel value="reais" control={<Radio />} label="Reais" />
              <FormControlLabel value="percentagem" control={<Radio />} label="%" />
            </Stack>
          </RadioGroup>
          <CenteredButton variant="contained" color="primary">Cadastrar</CenteredButton>
        </Paper>
      </Stack>
    </Box>
  );
}
