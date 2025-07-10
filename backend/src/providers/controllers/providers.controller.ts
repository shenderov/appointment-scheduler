import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ProvidersService } from '../services/providers.service';
import { CreateProviderDto } from '../dtos/create-provider.dto';
import { Provider } from '../entities/providers.entity';
import { AuthGuard } from '@nestjs/passport';
import { ProviderPublicResponseDto } from '../dtos/provider-public-response.dto';
import { ProviderResponseDto } from '../dtos/provider-response.dto';

@Controller('provider')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post('')
  async create(@Body() dto: CreateProviderDto): Promise<Provider> {
    return this.providersService.create(dto);
  }

  @Get('/public/providers')
  findAllPublic(): Promise<ProviderPublicResponseDto[]> {
    return this.providersService.findAllPublic();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/providers')
  findAll(): Promise<ProviderResponseDto[]> {
    return this.providersService.findAll();
  }
}
