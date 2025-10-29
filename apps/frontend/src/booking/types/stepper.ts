import type { ProviderPublicResponseDto } from '@shared-models/dtos/providers/provider-public-response.dto';
import type { ServicePublicResponseDto } from '@shared-models/dtos/services/service-public-response.dto';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';

export interface StepperState {
  provider: ProviderPublicResponseDto | null;
  service: ServicePublicResponseDto | null;
  selectedClient: UserResponseDto | null;
  user: UserResponseDto | null;
  availableServices: ServicePublicResponseDto[];
  availableTimes: string[];
  selectedDate: string | null;
  selectedTime: string | null;
  acknowledged: boolean;
  comments: string;
  activeStep: number;
}

export interface StepperActions {
  setService: (service: ServicePublicResponseDto) => void;
  setSelectedClient: (client: UserResponseDto) => void;
  setSelectedDate: (date: string | null) => void;
  setSelectedTime: (time: string | null) => void;
  setAcknowledged: (ack: boolean) => void;
  setComments: (comments: string) => void;
  fetchTimes: (date: string) => Promise<string[] | void>;
  nextStep: () => void;
  backStep: () => void;
  confirm: () => Promise<void>;
}

export type StepProps = StepperState & StepperActions;

export interface StepFlow {
  key: string;
  label: string;
  component: React.ComponentType<StepProps>;
}
