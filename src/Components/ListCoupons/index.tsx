import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import { Typography } from '@mui/material';
import { getCupons } from '../../services/apiService';

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

  useEffect(() => {
    const fetchCupons = async () => {
      try {
        const cuponsData = await getCupons();
        setCoupons(cuponsData.reverse());
      } catch (error) {
        console.error('Erro ao buscar os cupons:', error);
      }
    };

    fetchCupons();
  }, []);

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}>
      {coupons.map(coupon => (
        <ListItem key={coupon._id}>
          <ListItemAvatar>
            <Avatar>
              <DoneTwoToneIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={coupon.nome} secondary={coupon.cpf} />
          <Typography variant="body2" align="right">
            {coupon.valor} {coupon.formaPagamento}
          </Typography>
          <Typography variant="body2" align="right">
            {coupon.codigo}
          </Typography>
        </ListItem>
      ))}
    </List>
  );
}
