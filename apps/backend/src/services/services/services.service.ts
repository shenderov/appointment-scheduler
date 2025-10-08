import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from '@services/entities/services.entity';
import { CreateServiceDto } from '@services/dtos/create-services.dto';
import { UpdateServiceDto } from '@services/dtos/update-services.dto';
import { ServicePublicResponseDto } from '@services/dtos/service-public-response.dto';
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

  async findOne(id: number): Promise<Service> {
    const service = await this.serviceRepository.findOneBy({ id });
    if (!service) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
    return service;
  }

  async update(id: number, dto: UpdateServiceDto): Promise<Service> {
    const service = await this.findOne(id);
    Object.assign(service, dto);
    return await this.serviceRepository.save(service);
  }

  async delete(id: number): Promise<void> {
    const result = await this.serviceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Service with id ${id} not found`);
    }
  }
}
