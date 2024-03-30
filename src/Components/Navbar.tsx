import { AppBar, Box, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { logout } from '../services/AuthService';

export default function NavBar() {
  const location = useLocation();

  // Verifica se a rota atual é a rota de erro 404
  const isNotFoundRoute = location.pathname === '/notfound';

  // Não renderiza o NavBar se a rota atual for a rota de erro 404
  if (isNotFoundRoute) {
    return null;
  }

  const handleLogout = async () => {
    await logout(); 
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            PROMO QR
          </Typography>
          <Button color="inherit" component={Link} to="/" onClick={handleLogout}>
            Sair
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
