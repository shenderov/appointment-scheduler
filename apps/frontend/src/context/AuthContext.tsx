import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '@api/axios';
import { Role } from '@shared/models/enums';

interface User {
  userId?: string;
  name: string;
  email?: string;
  role: Role;
}

interface AuthContextType {
  user: User;
  loading: boolean;
  refreshUser: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({ name: 'Guest', role: Role.Guest });
  const [loading, setLoading] = useState(true);

  const refreshUser = async () => {
    try {
      const res = await api.get<User>('/users/me');
      setUser(res.data);
    } catch {
      setUser({ name: 'Guest', role: Role.Guest });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (user: User) => setUser(user);

  useEffect(() => {
    refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
