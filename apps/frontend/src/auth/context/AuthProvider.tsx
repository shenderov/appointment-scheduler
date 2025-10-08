import React, { useEffect, useState } from 'react';
import api from '@api/axios';
import { Role } from '@shared/models/enums';
import { AuthContext, type User } from '@auth/context/AuthContextBase';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({ name: 'Guest', role: Role.Guest });
  const [loading, setLoading] = useState(true);

  const refreshUser = async (): Promise<void> => {
    try {
      const res = await api.get<User>('/users/me');
      setUser(res.data);
    } catch {
      setUser({ name: 'Guest', role: Role.Guest });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (u: User): void => setUser(u);

  useEffect(() => {
    void refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
