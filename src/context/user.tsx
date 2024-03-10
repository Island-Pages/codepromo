import React, { createContext, useContext, useState } from 'react';

interface User {
  username: string;
  // Outras propriedades do usuário, se houver
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

// Defina um valor padrão como um objeto vazio ({}) para evitar esse erro
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {}
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => {
    // Lógica de autenticação aqui
    setUser(userData);
  };

  const logout = () => {
    // Lógica de logout aqui
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
