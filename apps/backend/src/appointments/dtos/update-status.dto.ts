import { IsEnum } from 'class-validator';
import { AppointmentStatus } from '../entities/appointments.entity';

export class UpdateAppointmentStatusDto {
  @IsEnum(['scheduled', 'cancelled', 'completed'])
  status!: AppointmentStatus;
}
