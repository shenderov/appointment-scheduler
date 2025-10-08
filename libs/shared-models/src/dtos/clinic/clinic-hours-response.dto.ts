import type { Weekday } from '@shared/models/constants';

export class ClinicDayHoursDto {
  weekday!: Weekday;
  isOpen!: boolean;
  startTime: string | null = null;
  endTime: string | null = null;
}

export class ClinicHoursPublicResponseDto {
  hours!: ClinicDayHoursDto[];
}
