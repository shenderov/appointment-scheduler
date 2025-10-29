import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared-models/enums/auth/role.enum';

const StepConfirmation = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdminOrProvider =
    user.role === Role.ADMIN || user.role === Role.PROVIDER;

  const handlePrimaryAction = () => {
    if (isAdminOrProvider) {
      void navigate('/admin/appointments');
    } else {
      void navigate('/client/appointments');
    }
  };

  const handleSecondaryAction = () => {
    if (isAdminOrProvider) {
      void navigate('/search');
    } else {
      void navigate('/');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      gap={3}
      sx={{ py: 6 }}
    >
      <CheckCircleOutlineIcon
        color="success"
        sx={{ fontSize: 64 }}
        aria-label="Appointment confirmed"
      />

      <Typography variant="h5" fontWeight={600}>
        {isAdminOrProvider
          ? 'Appointment Created Successfully'
          : 'Your Appointment is Confirmed!'}
      </Typography>

      <Typography variant="body1" color="text.secondary" maxWidth={500}>
        {isAdminOrProvider
          ? "The appointment has been added to the client's schedule."
          : 'You can view and manage your appointments in your dashboard.'}
      </Typography>

      <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          onClick={handlePrimaryAction}
          aria-label="Primary action"
        >
          {isAdminOrProvider ? 'View All Appointments' : 'My Appointments'}
        </Button>

        <Button
          variant="outlined"
          onClick={handleSecondaryAction}
          aria-label="Secondary action"
        >
          {isAdminOrProvider ? 'Book Another' : 'Return Home'}
        </Button>
      </Box>
    </Box>
  );
};

export default StepConfirmation;
