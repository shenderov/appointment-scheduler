import { UserSummaryDto } from '@shared-models/dtos/users/user-summary.dto';
import { ProviderSpecialty } from '@shared-models/enums/providers/provider-specialty.enum';

export class ProviderResponseDto {
  id!: number;
  profileImageUrl?: string;
  isActive!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
  specialty!: ProviderSpecialty;
  title!: string;
  bio!: string;
  license!: {
    licenseName: string;
    licenseNumber: string;
  };
  serviceIds!: string[];
  user!: UserSummaryDto;
}
