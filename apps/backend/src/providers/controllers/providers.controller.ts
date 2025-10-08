import { Controller, Post, Body, Get, UseGuards, Param } from '@nestjs/common';
import { ProvidersService } from '@providers/services/providers.service';
import { CreateProviderDto } from '@providers/dtos/create-provider.dto';
import { Provider } from '@providers/entities/providers.entity';
import { AuthGuard } from '@nestjs/passport';
import { ProviderPublicResponseDto } from '@providers/dtos/provider-public-response.dto';
import { ProviderResponseDto } from '@providers/dtos/provider-response.dto';

@Controller('provider')
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
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

  @Get('public/:id')
  async getPublicProvider(
    @Param('id') id: number,
  ): Promise<ProviderPublicResponseDto> {
    return this.providersService.getPublicProviderById(id);
  }
}
