import api from '@api/client';
import { LoginDto } from '@shared-models/dtos/auth/login.dto';
import { LoginResponseDto } from '@shared-models/dtos/auth/login-response.dto';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';

export const login = async (credentials: LoginDto): Promise<string> => {
  const { data } = await api.post<LoginResponseDto>('/auth/login', credentials);
  return data.access_token;
};

export const getCurrentUser = async (): Promise<UserResponseDto> => {
  const { data } = await api.get<UserResponseDto>('/auth/me');
  return data;
};
