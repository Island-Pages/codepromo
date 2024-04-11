import { AppBar, Box, Toolbar, Button, Avatar } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../services/AuthService';
import logo from '../assets/logo_semfundo.png'; // Imagem com fundo
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export default function NavBar() {
  const location = useLocation();

  const isNotFoundRoute = location.pathname === '/notfound';

  if (isNotFoundRoute) {
    return null;
  }

  const handleLogout = async () => {
    await logout(); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#003049' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Link to="/home">
            <Avatar style={{ width: '5rem', height: '5rem' }}> 
              <img src={logo} alt="Lock" style={{ width: '100%', height: '100%', backgroundColor: '#003049' }} />
            </Avatar>
          </Link>
          <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
            Sair
            <ExitToAppIcon sx={{ ml: 1 }} /> 
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
