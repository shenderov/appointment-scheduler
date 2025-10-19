import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from '@services/services/services.service';
import { CreateServiceDto } from '@shared-models/dtos/services/create-services.dto';
import { UpdateServiceDto } from '@shared-models/dtos/services/update-services.dto';
import { Service } from '@services/entities/services.entity';
import { AuthGuard } from '@nestjs/passport';
import { ServiceResponseDto } from '@shared-models/dtos/services/service-response.dto';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Service> {
    const service = await this.servicesService.findOne(id);
    if (!service) {
      throw new NotFoundException('Service not found');
    }
    return service;
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() dto: CreateServiceDto): Promise<Service> {
    return this.servicesService.create(dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateServiceDto,
  ): Promise<Service> {
    return await this.servicesService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.servicesService.delete(id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  findAll(): Promise<ServiceResponseDto[]> {
    return this.servicesService.findAll();
  }
}
