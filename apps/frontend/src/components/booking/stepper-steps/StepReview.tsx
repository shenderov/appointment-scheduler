import {
  Button,
  Typography,
  Box,
  Checkbox,
  TextField,
  FormControlLabel,
} from '@mui/material';

interface Provider {
  user: {
    name: string;
  };
}

interface Service {
  name: string;
}

interface StepReviewProps {
  provider: Provider;
  service: Service;
  selectedDate: string | null;
  selectedTime: string | null;
  acknowledged: boolean;
  comments: string;
  setAcknowledged: (value: boolean) => void;
  setComments: (value: string) => void;
  onBack: () => void;
  onConfirm: () => void;
}

const StepReview: React.FC<StepReviewProps> = ({
  provider,
  service,
  selectedDate,
  selectedTime,
  acknowledged,
  comments,
  setAcknowledged,
  setComments,
  onBack,
  onConfirm,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Appointment
      </Typography>

      <Typography>Provider: {provider.user.name}</Typography>
      <Typography>Service: {service.name}</Typography>
      <Typography>Date: {selectedDate || 'Not selected'}</Typography>
      <Typography>Time: {selectedTime || 'Not selected'}</Typography>

      <FormControlLabel
        control={
          <Checkbox
            checked={acknowledged}
            onChange={(e) => setAcknowledged(e.target.checked)}
          />
        }
        label="I acknowledge the terms and conditions"
        sx={{ mt: 2 }}
      />

      <TextField
        fullWidth
        label="Comments (optional)"
        value={comments}
        onChange={(e) => setComments(e.target.value)}
        multiline
        rows={3}
        sx={{ mt: 2 }}
      />

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
        <Button onClick={onBack}>Back</Button>
        <Button
          variant="contained"
          disabled={!acknowledged}
          onClick={onConfirm}
        >
          Confirm Appointment
        </Button>
      </Box>
    </Box>
  );
};

export default StepReview;
