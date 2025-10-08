import React, { SetStateAction, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Divider,
} from '@mui/material';

const RecordAppointment: React.FC = () => {
  const [status, setStatus] = useState<'completed' | 'cancelled' | 'scheduled'>(
    'completed',
  );
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { status, notes });
  };

  return (
    <Box
      sx={{
        maxWidth: 600,
        mx: 'auto',
        mt: 6,
        p: 2,
      }}
    >
      <Card elevation={3}>
        <CardHeader
          title="Record Appointment"
          subheader="Confirm the session outcome and add any relevant notes."
        />
        <Divider />
        <CardContent>
          <form onSubmit={handleSubmit}>
            {/* Appointment Info Placeholder */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                Appointment Details
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Client:</strong> John Doe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Service:</strong> Deep Tissue Massage
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Date:</strong> 2025-10-23 15:00
              </Typography>
            </Box>

            <FormControl fullWidth sx={{ mb: 3 }}>
              <FormLabel>Appointment Status</FormLabel>
              <RadioGroup
                row
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value as SetStateAction<
                      'completed' | 'cancelled' | 'scheduled'
                    >,
                  )
                }
              >
                <FormControlLabel
                  value="completed"
                  control={<Radio color="success" />}
                  label="Completed"
                />
                <FormControlLabel
                  value="cancelled"
                  control={<Radio color="error" />}
                  label="Cancelled"
                />
                <FormControlLabel
                  value="scheduled"
                  control={<Radio color="primary" />}
                  label="Still Scheduled"
                />
              </RadioGroup>
            </FormControl>

            <TextField
              label="Provider Notes"
              multiline
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              fullWidth
              placeholder="Add details about the session, client progress, or any recommendations..."
              sx={{ mb: 4 }}
            />

            <Box display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" color="secondary">
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save Record
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RecordAppointment;
