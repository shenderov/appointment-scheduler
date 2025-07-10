import { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  Checkbox,
  FormControlLabel,
  TextField,
} from '@mui/material';

const steps = ['Calendar', 'Review', 'Confirmation'];

const AppointmentStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [comments, setComments] = useState('');

  // Simulate available dates and time
  const availableDates = ['2025-06-27', '2025-06-28', '2025-06-30'];
  const availableTimes = ['10:00 AM', '11:30 AM', '1:00 PM', '3:00 PM'];

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    handleNext();
  };

  const handleConfirm = () => {
    // Simulate appointment creation success
    handleNext();
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 4 }}>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 4 }}>
        {activeStep === 0 && (
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Select a Date
              </Typography>
              {availableDates.map((date) => (
                <Button
                  key={date}
                  variant={selectedDate === date ? 'contained' : 'outlined'}
                  onClick={() => handleDateSelect(date)}
                  sx={{ m: 1 }}
                >
                  {date}
                </Button>
              ))}
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {selectedDate
                  ? `Available Times on ${selectedDate}`
                  : 'Select a date to see available times'}
              </Typography>
              {selectedDate &&
                availableTimes.map((time) => (
                  <Button
                    key={time}
                    variant="outlined"
                    onClick={() => handleTimeSelect(time)}
                    sx={{ m: 1 }}
                  >
                    {time}
                  </Button>
                ))}
            </Grid>
          </Grid>
        )}

        {activeStep === 1 && (
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Review Your Appointment
            </Typography>
            <Typography>Provider: Dr. Alice Martin</Typography>
            <Typography>Service: Massage Therapy</Typography>
            <Typography>
              Date/Time: {selectedDate} at {selectedTime}
            </Typography>

            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={acknowledged}
                    onChange={(e) => setAcknowledged(e.target.checked)}
                  />
                }
                label="I acknowledge that the above information is correct."
              />
            </Box>

            <TextField
              fullWidth
              label="Additional Comments"
              multiline
              minRows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              sx={{ mt: 2 }}
            />

            <Box mt={3} display="flex" gap={2}>
              <Button onClick={handleBack}>Back</Button>
              <Button
                variant="contained"
                onClick={handleConfirm}
                disabled={!acknowledged}
              >
                Confirm Appointment
              </Button>
            </Box>
          </Paper>
        )}

        {activeStep === 2 && (
          <Box textAlign="center">
            <Typography variant="h5" gutterBottom>
              Your appointment is confirmed!
            </Typography>
            <Button variant="contained" href="/appointments">
              My Appointments
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default AppointmentStepper;
