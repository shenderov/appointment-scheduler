import StepLayout from '@booking/components/stepper-steps/StepLayout';
import {
  Typography,
  Box,
  Checkbox,
  TextField,
  FormControlLabel,
} from '@mui/material';
import { ProviderPublicResponseDto } from '@shared-models/src/dtos/providers/provider-public-response.dto';
import { ServicePublicResponseDto } from '@shared-models/src/dtos/services/service-public-response.dto';
import { Role } from '@shared-models/enums/auth/role.enum';
import { UserResponseDto } from '@shared-models/dtos/users/user-response.dto';

interface StepReviewProps {
  provider: ProviderPublicResponseDto;
  service: ServicePublicResponseDto;
  selectedDate: string | null;
  selectedTime: string | null;
  acknowledged: boolean;
  approve: boolean;
  comments: string;
  setAcknowledged: (value: boolean) => void;
  setApprove: (value: boolean) => void;
  setComments: (value: string) => void;
  backStep: () => void;
  confirm: () => void;
  selectedClient: UserResponseDto | null;
  user?: UserResponseDto | null;
}

const StepReview: React.FC<StepReviewProps> = ({
  provider,
  service,
  selectedDate,
  selectedTime,
  acknowledged,
  approve,
  comments,
  setAcknowledged,
  setApprove,
  setComments,
  backStep,
  confirm,
  selectedClient,
  user,
}) => {
  return (
    <StepLayout
      title="Review Appointment Details"
      onBack={backStep}
      onNext={confirm}
      nextDisabled={!acknowledged}
      nextLabel="Confirm Appointment"
    >
      {user &&
        (user.role === Role.ADMIN || user.role === Role.PROVIDER) &&
        selectedClient && (
          <Typography>Client: {selectedClient.name}</Typography>
        )}
      <Typography>Provider: {provider.user.name}</Typography>
      <Typography>Service: {service.name}</Typography>
      <Typography>Date: {selectedDate || 'Not selected'}</Typography>
      <Typography>Time: {selectedTime || 'Not selected'}</Typography>

      <Box sx={{ mt: 2 }}>
        <FormControlLabel
          control={
            <Checkbox
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
            />
          }
          label="I acknowledge the terms and conditions"
          sx={{ display: 'block', mb: 1 }}
        />

        {user && (user.role === Role.ADMIN || user.role === Role.PROVIDER) && (
          <FormControlLabel
            control={
              <Checkbox
                checked={approve}
                onChange={(a) => setApprove(a.target.checked)}
              />
            }
            label="Approve this appointment immediately after creation"
            sx={{ display: 'block' }}
          />
        )}
      </Box>

      <TextField
        fullWidth
        label="Comments (optional)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        multiline
        rows={3}
        sx={{ mt: 2 }}
      />
    </StepLayout>
  );
};

export default StepReview;
