import { createContext } from 'react';
import { Role } from '@shared-models/enums/auth/role.enum';

export interface User {
  userId?: string;
  name: string;
  email?: string;
  role: Role;
}

export interface AuthContextType {
  user: User;
  loading: boolean;
  refreshUser: () => Promise<void>;
  updateUser: (user: User) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
