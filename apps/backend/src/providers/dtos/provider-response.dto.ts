import { UserResponseDto } from '@shared/models/dtos';

export class ProviderResponseDto {
  id!: string;
  profileImageUrl?: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  specialty!: string;
  title!: string;
  bio!: string;
  license!: {
    licenseName: string;
    licenseNumber: string;
  };
  serviceIds!: string[];
  user!: UserResponseDto;
}
