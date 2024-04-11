import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import { Typography } from '@mui/material';
import { getCupons } from '../../services/apiService';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

// Definindo um tipo para os dados dos cupons
interface Cupon {
  _id: string;
  nome: string;
  cpf: string;
  valor: number;
  formaPagamento: string;
  qrCode: string;
  codigo: string;
  validado: boolean;
  __v: number;
}

export default function ListCoupons() {
  const [coupons, setCoupons] = useState<Cupon[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCupons = async () => {
      try {
        const cuponsData = await getCupons();
        setCoupons(cuponsData.reverse());
      } catch (error) {
        console.error('Erro ao buscar os cupons:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchCupons();
  }, []);

  return (
    <>
      <Backdrop
        sx={{ color: '#ffff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto', boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)', visibility: loading ? 'hidden' : 'visible' }}>
        {coupons.map(coupon => (
          <ListItem key={coupon._id}>
            <ListItemAvatar>
              <Avatar>
                <DoneTwoToneIcon style={{ color: 'white', backgroundColor: '#32CD32', width: '100%', height: '100%', padding: 3, margin: 3 }}/>
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={coupon.nome} secondary={coupon.cpf} />
            <Typography variant="body2" align="right">
              {coupon.formaPagamento === 'reais' ? `R$ ${coupon.valor}` : coupon.formaPagamento === '%' ? `${coupon.valor} %` : coupon.valor}
            </Typography>
          </ListItem>
        ))}
      </List>
    </>
  );
}
