import { ProviderSpecialty } from "@shared-models/enums/providers/provider-specialty.enum";
import { UserSummaryDto } from "@shared-models/dtos/users/user-summary.dto";

export class ProviderPublicResponseDto {
  id!: number;
  profileImageUrl?: string;
  specialty!: ProviderSpecialty;
  title!: string;
  bio!: string;
  license!: {
    licenseName: string;
    licenseNumber: string;
  };
  serviceIds!: number[];
  user!: UserSummaryDto;
}
