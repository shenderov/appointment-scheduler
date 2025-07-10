import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../entities/providers.entity';
import { CreateProviderDto } from '../dtos/create-provider.dto';
import { JwtService } from '@nestjs/jwt';
import { ProviderPublicResponseDto } from '../dtos/provider-public-response.dto';
import { plainToInstance } from 'class-transformer';
import { ProviderResponseDto } from '../dtos/provider-response.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private providerRepository: Repository<Provider>,
    private jwtService: JwtService,
  ) {}

  async create(createProviderDto: CreateProviderDto): Promise<Provider> {
    const user = this.providerRepository.create({
      ...createProviderDto,
    });
    return this.providerRepository.save(user);
  }

  async findAllPublic(): Promise<ProviderPublicResponseDto[]> {
    const providers = await this.providerRepository.find({
      where: { isActive: true },
      relations: ['services'],
    });

    return providers.map((provider) =>
      plainToInstance(ProviderPublicResponseDto, {
        id: provider.id,
        profileImageUrl: provider.profileImageUrl,
        specialty: provider.specialty,
        title: provider.title,
        bio: provider.bio,
        license: {
          licenseName: provider.licenseName,
          licenseNumber: provider.licenseNumber,
        },
        serviceIds: provider.services?.map((s) => s.id) ?? [],
        user: {
          id: provider.user.id,
          name: provider.user.name,
        },
      }),
    );
  }

  async findAll(): Promise<ProviderResponseDto[]> {
    const providers = await this.providerRepository.find({
      relations: ['services'],
    });

    return providers.map((provider) =>
      plainToInstance(ProviderResponseDto, {
        id: provider.id,
        profileImageUrl: provider.profileImageUrl,
        isActive: provider.isActive,
        createdAt: provider.createdAt,
        updatedAt: provider.updatedAt,
        specialty: provider.specialty,
        title: provider.title,
        bio: provider.bio,
        license: {
          licenseName: provider.licenseName,
          licenseNumber: provider.licenseNumber,
        },
        serviceIds: provider.services?.map((s) => s.id) ?? [],
        user: provider.user,
      }),
    );
  }
}
