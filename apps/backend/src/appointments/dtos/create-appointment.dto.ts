import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';
import { AppointmentStatus } from '../entities/appointments.entity';

export class CreateAppointmentDto {
  @IsInt()
  providerId!: number;

  @IsInt()
  userId!: number;

  @IsInt()
  serviceId!: number;

  @IsBoolean()
  acknowledgment!: boolean;

  @IsString()
  comments!: string;

  @IsDateString()
  startTime!: string;

  @IsOptional()
  @IsEnum(['scheduled', 'cancelled', 'completed'])
  status!: AppointmentStatus;
}
