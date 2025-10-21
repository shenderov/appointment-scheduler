import { createContext } from 'react';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';

export interface AuthContextType {
  user: UserResponseDto;
  loading: boolean;
  refreshUser: () => Promise<void>;
  updateUser: (user: UserResponseDto) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);
