import api from '@api/client';

export const fetchAvailableSlots = async (
  providerId: number,
  serviceId: number,
  date: string,
): Promise<string[]> => {
  const { data } = await api.get<string[]>('/availability/public/slots', {
    params: { providerId, serviceId, date },
  });
  return data;
};
