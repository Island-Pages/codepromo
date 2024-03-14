import { useState, useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import { Typography } from '@mui/material';
import { getCupons } from '../../services/apiService';

export default function ListCoupons() {
  const [coupons, setCoupons] = useState([]);

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
        </ListItem>
      ))}
    </List>
  );
}
