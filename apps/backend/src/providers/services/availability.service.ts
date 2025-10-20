import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
import { Provider } from '@providers/entities/provider.entity';
import { Service } from '@services/entities/services.entity';
import { Appointment } from '@appointments/entities/appointment.entity';
import { ProviderHours } from '@providers/entities/provider-hours.entity';
import { ProviderHoursOverride } from '@providers/entities/provider-hours-override.entity';
import { ClinicHours } from '@clinic/entities/clinic-hours.entity';
import { ClinicHoursException } from '@clinic/entities/clinic-hours-exception.entity';
import { getAvailableTimeSlots } from '@providers/utils/get-available-time-slots';
import { parseISO } from 'date-fns';
import { Weekday } from '@shared-models/constants/common/weekdays';
import { AppointmentStatus } from '@shared-models/enums/appointments/status.enum';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Provider)
    private providerRepo: Repository<Provider>,

    @InjectRepository(Service)
    private serviceRepo: Repository<Service>,

    @InjectRepository(Appointment)
    private appointmentsRepo: Repository<Appointment>,

    @InjectRepository(ProviderHours)
    private providerHoursRepo: Repository<ProviderHours>,

    @InjectRepository(ProviderHoursOverride)
    private providerOverrideRepo: Repository<ProviderHoursOverride>,

    @InjectRepository(ClinicHours)
    private clinicHoursRepo: Repository<ClinicHours>,

    @InjectRepository(ClinicHoursException)
    private clinicExceptionRepo: Repository<ClinicHoursException>,
  ) {}

  async getAvailableSlots(
    providerId: number,
    serviceId: number,
    dateStr: string,
  ): Promise<string[]> {
    const now = new Date();
    const date = parseISO(dateStr); // validated ISO string from controller

    const provider = await this.providerRepo.findOne({
      where: { id: providerId },
    });
    if (!provider) throw new BadRequestException('Provider not found');

    const service = await this.serviceRepo.findOne({
      where: { id: serviceId },
    });
    if (!service) throw new BadRequestException('Service not found');

    const weekday = date
      .toLocaleDateString('en-CA', { weekday: 'long' })
      .toLowerCase(); // e.g. 'monday'

    const providerHours = await this.providerHoursRepo.findOne({
      where: {
        provider: { id: providerId },
        weekday: weekday as Weekday,
      },
      relations: ['provider'],
    });

    const override = await this.providerOverrideRepo.findOne({
      where: { providerId, date: dateStr },
    });

    const clinicHours = await this.clinicHoursRepo.findOne({
      where: { weekday: weekday as Weekday },
    });

    const clinicException = await this.clinicExceptionRepo.findOne({
      where: { date: dateStr },
    });

    const appointments = await this.appointmentsRepo.find({
      where: {
        provider: { id: providerId },
        startTime: Raw((alias) => `DATE(${alias}) = :date`, { date: dateStr }),
        status: AppointmentStatus.SCHEDULED,
      },
    });

    // In a real system, get these from config table:
    const maxBookingDays = 60;
    const minAdvanceMinutes = 120;

    console.log(providerHours);
    console.log(override);
    console.log(clinicHours);
    console.log(clinicException);

    return getAvailableTimeSlots({
      providerHours: providerHours || undefined,
      override: override || undefined,
      clinicHours: clinicHours || undefined,
      clinicException: clinicException || undefined,
      appointments,
      service,
      date: dateStr,
      now,
      minAdvanceMinutes,
      maxBookingDays,
    });
  }
}
