import api from '@api/client';
import { ServicePublicResponseDto } from '@shared-models/dtos/services/service-public-response.dto';

export const fetchServices = async (): Promise<ServicePublicResponseDto[]> => {
  const res = await api.get<ServicePublicResponseDto[]>(
    '/services/public/services',
  );
  return res.data;
};
