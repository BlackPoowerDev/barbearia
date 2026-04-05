/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useState } from 'react';
import api from '@/services/api';

type User = {
    user: {
        id: string;};
    id: string;
    name: string;
    type: string;
};

type AuthContextData = {
    signed: boolean;
    user: User | null;
    loading: boolean,
    setUserData: (userData: User) => void;
};

export const AuthContext = createContext({} as AuthContextData);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const setUserData = (userData: User) => {setUser(userData)};
    
  useEffect(() => {
    async function loadStorage() {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await api.get('barbers/validate');
          
          setUser(response.data.user);

        } catch (error) {
          console.error('Token inválido ou expirado', error);
          // localStorage.removeItem('token');
        }
      }

      setLoading(false);
    }

    loadStorage();
  }, []);

  return (
    <AuthContext.Provider value={{ signed: !!user, user, loading, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};