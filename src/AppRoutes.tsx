import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import NavBar from './Components/Navbar';
import HomePage from './screens/Home/Index';
import CreateCode from './screens/CreateCode';
import ValidationCode from './screens/ValidationCode';
import Login from './screens/Login';
import CodeCreated from './screens/CodeCreated';
import ValidCode from './screens/ValidCode';
import NotFound from './screens/404'; // Importe sua tela de 404
import { isLoggedIn } from './services/AuthService';
import { useEffect } from 'react';

const AppRoutes = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoggedIn = async () => {
      if (isLoggedIn() && location.pathname === "/") {
        navigate('/home');
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Routes>
      {/* Rota de login */}
      <Route path="/" element={<Login />} />

      {/* Rota protegida */}
      <Route
        path="/*"
        element={
          isLoggedIn() ? (
            <>
              <NavBar /> 
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/createCode" element={<CreateCode />} />
                <Route path="/createdCode" element={<CodeCreated />} />
                <Route path="/validationCode" element={<ValidationCode />} />
                <Route path="/validCode" element={<ValidCode />} />
                <Route path="/notfound" element={<NotFound />} /> 
                <Route path="*" element={<Navigate to="/notfound" />} /> 
              </Routes>
            </>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
};

export default AppRoutes;
