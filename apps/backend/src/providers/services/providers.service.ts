import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '@providers/entities/provider.entity';
import { CreateProviderDto } from '@shared-models/dtos/providers/create-provider.dto';
import { JwtService } from '@nestjs/jwt';
import { ProviderPublicResponseDto } from '@shared-models/dtos/providers/provider-public-response.dto';
import { plainToInstance } from 'class-transformer';
import { ProviderResponseDto } from '@shared-models/dtos/providers/provider-response.dto';
import { mapToPublicProviderDto } from '@providers/mappers/mapToPublicProviderDto';

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
          name: `${provider.user.firstName} ${provider.user.lastName}`,
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

  async getPublicProviderById(id: number): Promise<ProviderPublicResponseDto> {
    const provider = await this.providerRepository.findOne({
      where: { id },
      relations: ['services', 'user'],
    });

    if (!provider) throw new NotFoundException('Provider not found');

    return mapToPublicProviderDto(provider); // create this mapper if not yet available
  }
}
