import { addMinutes, isBefore, parse } from 'date-fns';
import { Appointments } from '@appointments/entities/appointments.entity'; // Adjust paths as needed
import { Service } from '@services/entities/services.entity';
import { ClinicHours } from '@clinic/entities/clinic-hours.entity';
import { ClinicHoursException } from '@clinic/entities/clinic-hours-exception.entity';
import { ProviderHours } from '@providers/entities/provider-hours.entity';
import { ProviderHoursOverride } from '@providers/entities/provider-hours-override.entity';

interface TimeSlotParams {
  providerHours?: ProviderHours;
  override?: ProviderHoursOverride | null;
  clinicHours?: ClinicHours | null;
  clinicException?: ClinicHoursException | null;
  appointments: Appointments[];
  service: Service;
  date: string; // 'YYYY-MM-DD'
  now: Date;
  minAdvanceMinutes: number;
  maxBookingDays: number;
}

export function getAvailableTimeSlots({
  providerHours,
  override,
  clinicHours,
  clinicException,
  appointments,
  service,
  date,
  now,
  minAdvanceMinutes,
  maxBookingDays,
}: TimeSlotParams): string[] {
  const availableSlots: string[] = [];

  const targetDate = new Date(date);
  const daysAhead =
    (targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

  if (isBefore(targetDate, now) || daysAhead > maxBookingDays) {
    return []; // past or too far in future
  }

  const intervalMinutes = 15;
  const totalTimeNeeded = service.durationMin + service.breakMin;

  // Pick clinic working hours (considering exceptions)
  const isClinicOpen = clinicException
    ? clinicException.isOpen &&
      !!clinicException.startTime &&
      !!clinicException.endTime
    : clinicHours?.isOpen && !!clinicHours.startTime && !!clinicHours.endTime;

  if (!isClinicOpen || !providerHours || !service) {
    return []; // fail gracefully if any of the key data is missing
  }

  const clinicStart = parse(
    clinicException?.startTime || clinicHours!.startTime,
    'HH:mm:ss',
    targetDate,
  );
  const clinicEnd = parse(
    clinicException?.endTime || clinicHours!.endTime,
    'HH:mm:ss',
    targetDate,
  );

  const isProviderAvailable = override
    ? !override.isDayOff && override.startTime && override.endTime
    : providerHours.isAvailable &&
      !!providerHours.startTime &&
      !!providerHours.endTime;

  if (!isProviderAvailable) return [];

  const providerStart = parse(
    override?.startTime || providerHours.startTime,
    'HH:mm:ss',
    targetDate,
  );
  const providerEnd = parse(
    override?.endTime || providerHours.endTime,
    'HH:mm:ss',
    targetDate,
  );

  // Final availability window = overlap of clinic and provider hours
  const availableStart = new Date(
    Math.max(clinicStart.getTime(), providerStart.getTime()),
  );
  const availableEnd = new Date(
    Math.min(clinicEnd.getTime(), providerEnd.getTime()),
  );

  for (
    let slot = new Date(availableStart);
    slot <= new Date(availableEnd.getTime() - totalTimeNeeded * 60000);
    slot = addMinutes(slot, intervalMinutes)
  ) {
    const slotEnd = addMinutes(slot, service.durationMin);

    // Skip if the appointment would end after availability window
    if (slotEnd > availableEnd) continue;

    // Skip if not enough notice time
    if (addMinutes(now, minAdvanceMinutes) > slot) continue;

    // Check for overlap with existing appointments
    const conflict = appointments.some((a) => {
      const apptStart = new Date(a.startTime);
      const apptEnd = new Date(
        apptStart.getTime() + totalTimeNeeded * 60 * 1000,
      );
      return slot < apptEnd && slotEnd > apptStart;
    });

    if (!conflict) {
      availableSlots.push(slot.toTimeString().slice(0, 5)); // "HH:mm"
    }
  }

  return availableSlots;
}
