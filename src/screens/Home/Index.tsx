import { Link } from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ListCoupons from '../../Components/ListCoupons';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

export default function HomePage() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', backgroundColor: '#FBFBFF' }}>
      <Stack spacing={{ xs: 1, sm: 2 }} direction="row" useFlexGap flexWrap="wrap">
        <Grid container justifyContent="space-between">
          <Grid item>
            <Button variant="contained" component={Link} to="/createCode">Cadastrar um novo cupom</Button>
          </Grid>
          <Grid item>
            <Button variant="contained" component={Link} to="/validationCode">Validar um cupom</Button>
          </Grid>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item xs={12} sx={{ paddingBottom: 2 }}>
          <Item sx={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '1rem', backgroundColor:'#003049', color:'white ' }}>Últimos cupons:</Item>
          </Grid>
          <Grid item xs={12} >
            <ListCoupons />
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}
