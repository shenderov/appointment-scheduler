import { useContext } from 'react';
import {
  AuthContext,
  type AuthContextType,
} from '@auth/context/AuthContextBase';

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};
