import { UserResponseDto } from '../../users/dtos/user-response.dto';

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
