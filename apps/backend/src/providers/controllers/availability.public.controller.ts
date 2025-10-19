import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilityService } from '@providers/services/availability.service';

@Controller('availability/public')
export class AvailabilityPublicController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get('slots')
  async getSlots(
    @Query('providerId') providerId: number,
    @Query('serviceId') serviceId: number,
    @Query('date') date: string, // format: YYYY-MM-DD
  ): Promise<string[]> {
    return this.availabilityService.getAvailableSlots(
      providerId,
      serviceId,
      date,
    );
  }
}
