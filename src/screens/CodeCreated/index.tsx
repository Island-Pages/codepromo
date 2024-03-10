import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { NavLink } from 'react-router-dom';

const Title = styled('div')(({ theme }) => ({
  textAlign: 'center',
  fontSize: '24px',
  fontWeight: 'bold',
  marginBottom: theme.spacing(2),
}));

const CodeContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

export default function CodeCreated() {
  // Simulated data
  const codeData = '123456';
  const qrCodeUrl = `https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=${encodeURIComponent(codeData)}`;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="column" alignItems="center">
        <Paper sx={{ padding: 2, width: '400px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <NavLink to="/home" style={{ color: 'inherit', textDecoration: 'none' }}>
            <IconButton color="inherit" aria-label="Voltar" sx={{ position: 'absolute', left: '4rem', top: '6rem' }}>
              <ArrowBackIcon />
            </IconButton>
          </NavLink>
          <Title>CUPOM</Title>
          <CodeContainer>
            <img src={qrCodeUrl} alt="QR Code" />
            <div>{codeData}</div>
          </CodeContainer>
          <Stack spacing={1} direction="row" justifyContent="center">
            <Button variant="contained" color="primary" onClick={() => { /* Implementar lógica para compartilhar */ }}>
              Compartilhar
            </Button>
            <Button variant="contained" color="primary" component={NavLink} to="/home">
              Voltar
            </Button>
          </Stack>
        </Paper>
      </Stack>
    </Box>
  );
}
