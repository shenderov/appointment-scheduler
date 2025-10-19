import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ProvidersService } from '@providers/services/providers.service';
import { CreateProviderDto } from '@shared-models/dtos/providers/create-provider.dto';
import { Provider } from '@providers/entities/providers.entity';
import { AuthGuard } from '@nestjs/passport';
import { ProviderResponseDto } from '@shared-models/dtos/providers/provider-response.dto';

@Controller('providers')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateProviderDto): Promise<Provider> {
    return this.providersService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/providers')
  findAll(): Promise<ProviderResponseDto[]> {
    return this.providersService.findAll();
  }
}
