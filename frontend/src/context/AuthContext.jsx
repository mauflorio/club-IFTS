import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const authUser = async () => {
    if (!user?.email) return;

    try {
      const res = await axios.get(`/api/usuario/${encodeURIComponent(user.email)}`);
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (error) {
      console.error("Error al refrescar el usuario:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, authUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
