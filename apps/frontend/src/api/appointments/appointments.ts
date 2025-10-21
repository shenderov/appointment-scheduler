import api from '@api/client';
import { CreateAppointmentDto } from '@shared-models/dtos/appointments/create-appointment.dto';
import { AppointmentInfoClientDto } from '@shared-models/dtos/appointments/appointment-info-client.dto';

export const createAppointment = async (
  payload: CreateAppointmentDto,
): Promise<AppointmentInfoClientDto> => {
  const res = await api.post<AppointmentInfoClientDto>(
    '/appointments',
    payload,
  );
  return res.data;
};

export const getAppointments = async (): Promise<
  AppointmentInfoClientDto[]
> => {
  const res = await api.get<AppointmentInfoClientDto[]>('/appointments');
  return res.data;
};
