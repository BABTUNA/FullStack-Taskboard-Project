import { createContext, useContext, useState } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  async function authenticate(mode, form) {
    if (mode === 'register') await api('/auth/register', { method: 'POST', body: JSON.stringify(form) });
    const result = await api('/auth/login', { method: 'POST', body: JSON.stringify(form) });
    localStorage.setItem('taskboard-token', result.token);
    setUser(result.user);
  }
  function logout() { localStorage.removeItem('taskboard-token'); setUser(null); }
  return <AuthContext.Provider value={{ authenticate, logout, user }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
