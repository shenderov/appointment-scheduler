import { Controller, Get } from '@nestjs/common';
import { ClinicHoursService } from '@clinic/services/clinic-hours.service';
import { ClinicHoursPublicResponseDto } from '@shared/models/dtos';

@Controller('clinic')
export class ClinicHoursController {
  constructor(private readonly clinicHoursService: ClinicHoursService) {}

  @Get('/public/clinic-hours')
  findAllPublic(): Promise<ClinicHoursPublicResponseDto> {
    return this.clinicHoursService.findAll();
  }
}
