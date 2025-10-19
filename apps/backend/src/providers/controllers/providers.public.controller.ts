import { Controller, Get, Param } from '@nestjs/common';
import { ProvidersService } from '@providers/services/providers.service';
import { ProviderPublicResponseDto } from '@shared-models/dtos/providers/provider-public-response.dto';

@Controller('providers/public')
export class ProvidersPublicController {
  constructor(private readonly providersService: ProvidersService) {}

  @Get('providers')
  findAllPublic(): Promise<ProviderPublicResponseDto[]> {
    return this.providersService.findAllPublic();
  }

  @Get(':id')
  async getPublicProvider(
    @Param('id') id: number,
  ): Promise<ProviderPublicResponseDto> {
    return this.providersService.getPublicProviderById(id);
  }
}
