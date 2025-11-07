import api from '@api/client';
import { LoginDto } from '@shared-models/dtos/auth/login.dto';
import { LoginResponseDto } from '@shared-models/dtos/auth/login-response.dto';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';
import { ChangePasswordDto } from '@shared-models/src/dtos/auth/change-password.dto';
import { SignUpDto } from '@shared-models/src/dtos/auth/sign-up.dto';

export const login = async (
  credentials: LoginDto,
): Promise<LoginResponseDto> => {
  const { data } = await api.post<LoginResponseDto>('/auth/login', credentials);
  return data;
};

export const getCurrentUser = async (): Promise<UserResponseDto> => {
  const { data } = await api.get<UserResponseDto>('/auth/me');
  return data;
};

export const changePassword = async (
  changePasswordDto: ChangePasswordDto,
): Promise<{ message: string }> => {
  const { data } = await api.post<{ message: string }>(
    '/auth/change-password',
    changePasswordDto,
  );
  return data;
};

export const signup = async (
  signUpDto: SignUpDto,
): Promise<LoginResponseDto> => {
  const { data } = await api.post<LoginResponseDto>('/auth/signup', signUpDto);
  console.log('Signup response data: ', data);
  return data;
};
