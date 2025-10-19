import { UserSummaryDto } from "@shared-models/dtos/users/user-summary.dto";
import { ProviderSpecialty } from "@shared-models/enums/providers/provider-specialty.enum";

export class ProviderSummaryDto {
  id!: number;
  specialty!: ProviderSpecialty;
  title!: string;
  user!: UserSummaryDto;
}
