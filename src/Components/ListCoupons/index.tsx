import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import DoneTwoToneIcon from '@mui/icons-material/DoneTwoTone';
import { Typography } from '@mui/material';

export default function ListCoupons() {
  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DoneTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Aqui vai o nome" secondary="217.746.090-53" />
        <Typography variant="body2" align="right">
          R$10
        </Typography>
      </ListItem>

      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DoneTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Gabigol" secondary="184.582.870-48" />
        <Typography variant="body2" align="right">
          15%
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DoneTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Bruno Henrique" secondary="863.540.370-35" />
        <Typography variant="body2" align="right">
          R$123
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DoneTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Nicolás de la Cruz" secondary="867.602.540-15" />
        <Typography variant="body2" align="right">
          R$25
        </Typography>
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <DoneTwoToneIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Aqui vai o nome" secondary="CPF" />
        <Typography variant="body2" align="right">
          R$10
        </Typography>
      </ListItem>
    </List>
  );
}
