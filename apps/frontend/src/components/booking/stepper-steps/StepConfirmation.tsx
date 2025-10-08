import { Box, Typography, Button } from '@mui/material';

const StepConfirmation = () => {
  return (
    <Box textAlign="center">
      <Typography variant="h5" gutterBottom>
        Your appointment is confirmed!
      </Typography>
      <Button variant="contained" href="/client/appointments">
        My Appointments
      </Button>
    </Box>
  );
};

export default StepConfirmation;
