import { AppointmentStatus } from '@shared-models/enums/appointments/status.enum';
import { IsEnum } from 'class-validator';

export class UpdateAppointmentStatusDto {
  @IsEnum(AppointmentStatus)
  status!: AppointmentStatus;
}
