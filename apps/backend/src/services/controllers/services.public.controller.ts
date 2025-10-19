import { Controller, Get } from '@nestjs/common';
import { ServicesService } from '@services/services/services.service';
import { ServicePublicResponseDto } from '@shared-models/dtos/services/service-public-response.dto';

@Controller('services/public')
export class ServicesPublicController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get('services')
  findAllPublic(): Promise<ServicePublicResponseDto[]> {
    return this.servicesService.findAllPublic();
  }
}
