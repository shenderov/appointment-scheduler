import type { Weekday } from '@shared-models/constants/common/weekdays';

export class ClinicDayHoursDto {
  weekday!: Weekday;
  isOpen!: boolean;
  startTime: string | null = null;
  endTime: string | null = null;
}

export class ClinicHoursPublicResponseDto {
  hours!: ClinicDayHoursDto[];
}
