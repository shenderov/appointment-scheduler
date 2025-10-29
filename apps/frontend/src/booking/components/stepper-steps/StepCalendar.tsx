import { Typography, Button, Box } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import StepLayout from '@booking/components/stepper-steps/StepLayout';

interface StepCalendarProps {
  selectedDate: string | null;
  availableTimes: string[];
  setSelectedDate: (date: string) => void;
  fetchTimes: (date: string) => void;
  setSelectedTime: (time: string) => void;
  backStep: () => void;
  nextStep: () => void;
  today: Dayjs;
  maxDate: Dayjs;
}

const StepCalendar: React.FC<StepCalendarProps> = ({
  selectedDate,
  availableTimes,
  setSelectedDate,
  fetchTimes,
  setSelectedTime,
  backStep,
  nextStep,
  today,
  maxDate,
}) => {
  const handleDateChange = (newValue: Dayjs | null) => {
    if (!newValue) return;

    const isoDate = newValue.format('YYYY-MM-DD');
    if (isoDate === selectedDate) return;

    setSelectedDate(isoDate);
    fetchTimes(isoDate);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    nextStep();
  };

  return (
    <StepLayout onBack={backStep} showNext={false}>
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
                onChange={handleDateChange}
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

            {selectedDate ? (
              availableTimes.length > 0 ? (
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
                      onClick={() => handleTimeSelect(time)}
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
              ) : (
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  No available times for this date.
                </Typography>
              )
            ) : (
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                Select a date to view available times.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </StepLayout>
  );
};

export default StepCalendar;
