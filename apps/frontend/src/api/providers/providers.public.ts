import api from '@api/client';
import { ProviderPublicResponseDto } from '@shared-models/dtos/providers/provider-public-response.dto';

export const fetchProviders = async (): Promise<
  ProviderPublicResponseDto[]
> => {
  const res = await api.get<ProviderPublicResponseDto[]>(
    '/providers/public/providers',
  );
  return res.data;
};

export const fetchProviderById = async (
  id: number,
): Promise<ProviderPublicResponseDto> => {
  const res = await api.get<ProviderPublicResponseDto>(
    `/providers/public/${id}`,
  );
  return res.data;
};
