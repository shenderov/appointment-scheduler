import { Controller, Get } from '@nestjs/common';
import { ClinicHoursService } from '@clinic/services/clinic-hours.service';
import { ClinicHoursPublicResponseDto } from '@shared-models/dtos/clinic/clinic-hours-response.dto';

@Controller('clinic/public')
export class ClinicHoursPublicController {
  constructor(private readonly clinicHoursService: ClinicHoursService) {}

  @Get('clinic-hours')
  findAllPublic(): Promise<ClinicHoursPublicResponseDto> {
    return this.clinicHoursService.findAll();
  }
}
