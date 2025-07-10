import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseUUIDPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from '../services/services.service';
import { CreateServiceDto } from '../dtos/create-services.dto';
import { UpdateServiceDto } from '../dtos/update-services.dto';
import { Service } from '../entities/services.entity';
import { AuthGuard } from '@nestjs/passport';
import { ServicePublicResponseDto } from '../dtos/service-public-response.dto';
import { ServiceResponseDto } from '../dtos/service-response.dto';

@Controller('service')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Service> {
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
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdateServiceDto,
  ): Promise<Service> {
    return await this.servicesService.update(id, dto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id', new ParseUUIDPipe()) id: string): Promise<void> {
    await this.servicesService.delete(id);
  }

  @Get('/public/services')
  findAllPublic(): Promise<ServicePublicResponseDto[]> {
    return this.servicesService.findAllPublic();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/services')
  findAll(): Promise<ServiceResponseDto[]> {
    return this.servicesService.findAll();
  }
}
