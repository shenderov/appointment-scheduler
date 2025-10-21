import React, { useEffect, useState } from 'react';
import api from '@api/client';
import { Role } from '@shared-models/enums/auth/role.enum';
import { AuthContext } from '@auth/context/AuthContextBase';
import { UserResponseDto } from '@shared-models/src/dtos/users/user-response.dto';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserResponseDto>({
    id: 0,
    name: 'Guest',
    email: '',
    role: Role.GUEST,
  });
  const [loading, setLoading] = useState(true);

  const refreshUser = async (): Promise<void> => {
    try {
      const res = await api.get<UserResponseDto>('/auth/me');
      setUser(res.data);
    } catch {
      setUser({ id: 0, name: 'Guest', email: '', role: Role.GUEST });
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (u: UserResponseDto): void => setUser(u);

  useEffect(() => {
    void refreshUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
