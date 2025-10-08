import { Typography, Button, Box } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

interface StepCalendarProps {
  selectedDate: string | null;
  availableTimes: string[];
  setSelectedDate: (date: string) => void;
  fetchAvailableTimes: (date: string) => void;
  setSelectedTime: (time: string) => void;
  onBack: () => void;
  today: Dayjs;
  maxDate: Dayjs;
}

const StepCalendar: React.FC<StepCalendarProps> = ({
  selectedDate,
  availableTimes,
  setSelectedDate,
  fetchAvailableTimes,
  setSelectedTime,
  onBack,
  today,
  maxDate,
}) => {
  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          md: '1fr 1fr',
        }}
        gap={4}
      >
        <Box>
          <Typography variant="h6" gutterBottom>
            Select a Date
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              value={selectedDate ? dayjs(selectedDate) : null}
              onChange={(newValue) => {
                if (!newValue) return;
                const isoDate = newValue.format('YYYY-MM-DD');
                setSelectedDate(isoDate);
                fetchAvailableTimes(isoDate);
              }}
              minDate={today}
              maxDate={maxDate}
            />
          </LocalizationProvider>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {selectedDate
              ? `Available Times on ${selectedDate}`
              : 'Select a date to see available times'}
          </Typography>

          {selectedDate && (
            <Box
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(3, 1fr)',
                sm: 'repeat(4, 1fr)',
                md: 'repeat(6, 1fr)',
              }}
              gap={1}
            >
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant="outlined"
                  onClick={() => setSelectedTime(time)}
                  sx={{
                    width: '100%',
                    py: 1,
                    fontSize: '0.875rem',
                    textTransform: 'none',
                  }}
                >
                  {time}
                </Button>
              ))}
            </Box>
          )}
        </Box>
      </Box>

      <Box display="flex" gap={2}>
        <Button onClick={onBack}>Back</Button>
      </Box>
    </Box>
  );
};

export default StepCalendar;
