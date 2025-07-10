import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '../entities/services.entity';
import { CreateServiceDto } from '../dtos/create-services.dto';
import { UpdateServiceDto } from '../dtos/update-services.dto';
import { ServicePublicResponseDto } from '../dtos/service-public-response.dto';
import { plainToInstance } from 'class-transformer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ServicesService {
  constructor(
    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
    private jwtService: JwtService,
  ) {}

  async create(createServiceDto: CreateServiceDto): Promise<Service> {
    const newService = this.serviceRepository.create(createServiceDto);
    return await this.serviceRepository.save(newService);
  }

  async findAll(): Promise<Service[]> {
    return await this.serviceRepository.find();
  }

  async findAllPublic(): Promise<ServicePublicResponseDto[]> {
    const services = await this.serviceRepository.find();

    return services.map((service) =>
      plainToInstance(ServicePublicResponseDto, {
        id: service.id,
        name: service.name,
        durationMin: service.durationMin,
      }),
    );
  }

  async findOne(id: string): Promise<Service> {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }

  async update(id: string, dto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id);
    Object.assign(service, dto);
    return await this.serviceRepository.save(service);
  }

  async delete(id: string): Promise<void> {
    const result = await this.serviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
  }
}
