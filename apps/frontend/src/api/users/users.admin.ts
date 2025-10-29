import api from '@api/client';
import type { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';

/**
 * Search for clients (admin or provider only).
 * @param query - The search query (name or email)
 * @returns List of matching users with role 'client'
 */
export const searchClients = async (
  query: string,
): Promise<UserResponseDto[]> => {
  const res = await api.get<UserResponseDto[]>('/users/search', {
    params: { query },
    withCredentials: false,
  });
  return res.data;
};
