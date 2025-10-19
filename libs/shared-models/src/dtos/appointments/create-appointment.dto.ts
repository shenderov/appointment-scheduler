import {
  IsBoolean,
  IsDateString,
  IsInt,
  IsString,
} from 'class-validator';

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
}
