import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { ClinicHours } from '@clinic/entities/clinic-hours.entity';
import {
  ClinicDayHoursDto,
  ClinicHoursPublicResponseDto,
} from '@shared-models/dtos/clinic/clinic-hours-response.dto';

@Injectable()
export class ClinicHoursService {
  constructor(
    @InjectRepository(ClinicHours)
    private clinicHoursRepository: Repository<ClinicHours>,
  ) {}

  async findAll(): Promise<ClinicHoursPublicResponseDto> {
    const hours = await this.clinicHoursRepository.find();

    const dayDtos: ClinicDayHoursDto[] = hours.map((entry) => ({
      weekday: entry.weekday,
      isOpen: entry.isOpen,
      startTime: entry.isOpen ? entry.startTime : null,
      endTime: entry.isOpen ? entry.endTime : null,
    }));

    return plainToInstance(ClinicHoursPublicResponseDto, {
      hours: dayDtos,
    });
  }
}
