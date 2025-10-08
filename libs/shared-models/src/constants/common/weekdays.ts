export const Weekdays = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const;

export type Weekday = (typeof Weekdays)[number];

export const WeekdayLabels: Record<Weekday, { full: string; short: string }> = {
  monday: { full: 'Monday', short: 'Mon' },
  tuesday: { full: 'Tuesday', short: 'Tue' },
  wednesday: { full: 'Wednesday', short: 'Wed' },
  thursday: { full: 'Thursday', short: 'Thu' },
  friday: { full: 'Friday', short: 'Fri' },
  saturday: { full: 'Saturday', short: 'Sat' },
  sunday: { full: 'Sunday', short: 'Sun' },
};
