import { AppointmentStatus } from "@shared-models/enums/appointments/status.enum";
import { ProviderSummaryDto } from "@shared-models/dtos/providers/provider-summary.dto";
import { UserSummaryDto } from "@shared-models/dtos/users/user-summary.dto";
import { ServiceSummaryDto } from "@shared-models/dtos/services/service-summary.dto";

export class AppointmentInfoClientDto {
  id!: number;
  provider!: ProviderSummaryDto;
  client!: UserSummaryDto;
  service!: ServiceSummaryDto;
  startTime!: string;
  comments!: string;
  status!: AppointmentStatus;
}
