export enum ClinicHoursExceptionReason {
  OPENED = 'opened',
  CLOSED = 'closed',
  EXTENDED = 'extended',
  SHORTENED = 'shortened',
}

export const ClinicHoursExceptionReasons = [ClinicHoursExceptionReason.OPENED, ClinicHoursExceptionReason.CLOSED, ClinicHoursExceptionReason.EXTENDED, ClinicHoursExceptionReason.SHORTENED] as const;
