import React, { useEffect, useState } from 'react';
import api from '@api/axios';
import { Role } from '@shared-models/enums/auth/role.enum';
import { AuthContext, type User } from '@auth/context/AuthContextBase';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>({ name: 'Guest', role: Role.GUEST });
  const [loading, setLoading] = useState(true);

  const refreshUser = async (): Promise<void> => {
    try {
      const res = await api.get<User>('/auth/me');
      setUser(res.data);
    } catch {
      setUser({ name: 'Guest', role: Role.GUEST });
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
