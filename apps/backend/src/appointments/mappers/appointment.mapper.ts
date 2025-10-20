import { Appointment } from '@appointments/entities/appointment.entity';
import { AppointmentInfoClientDto } from '@shared-models/dtos/appointments/appointment-info-client.dto';

export function toAppointmentInfoClientDto(
  entity: Appointment,
): AppointmentInfoClientDto {
  return {
    id: entity.id,
    provider: {
      id: entity.provider.id,
      specialty: entity.provider.specialty,
      title: entity.provider.title,
      user: {
        id: entity.provider.user.id,
        name: entity.provider.user.name,
      },
    },
    client: {
      id: entity.client.id,
      name: entity.client.name,
    },
    service: {
      id: entity.service.id,
      name: entity.service.name,
    },
    startTime: entity.startTime.toISOString(),
    comments: entity.comments,
    status: entity.status,
  };
}
