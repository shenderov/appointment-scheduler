import { useCallback, useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared/models/enums';
import axios from 'axios';
import dayjs from 'dayjs';

import StepService from '@components/booking/stepper-steps/StepService';
import StepCalendar from '@components/booking/stepper-steps/StepCalendar';
import StepReview from '@components/booking/stepper-steps/StepReview';
import StepConfirmation from '@components/booking/stepper-steps/StepConfirmation';

const steps = ['Service', 'Calendar', 'Review', 'Confirmation'];
const STORAGE_KEY = 'appointment-stepper';

type Service = {
  id: string;
  name: string;
  description: string;
  duration_min: number;
};

type Provider = {
  id: string;
  user: {
    id: string;
    name: string;
  };
  serviceIds: string[];
};

interface SavedStepperState {
  provider?: Provider | null;
  activeStep?: number;
  service?: Service | null;
  selectedDate?: string | null;
  selectedTime?: string | null;
  acknowledged?: boolean;
  comments?: string;
  providerId?: string;
  selectedServiceId?: string;
  filters?: Record<string, unknown>;
  fromLogin?: boolean;
}

function safeParseJSON<T>(jsonString: string | null): T | null {
  if (!jsonString) return null;
  try {
    return JSON.parse(jsonString) as T;
  } catch {
    return null;
  }
}

const AppointmentBookingStepper = () => {
  const [availableServices, setAvailableServices] = useState<Service[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [service, setService] = useState<Service | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [comments, setComments] = useState<string>('');
  const { user, loading } = useAuth();
  const isLoggedIn = user.role !== Role.Guest;
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as SavedStepperState | undefined;
  const filters = state?.filters;

  const today = dayjs();
  const maxDate = today.add(60, 'day');

  useEffect(() => {
    const providerId =
      state?.providerId ??
      (() => {
        const saved = sessionStorage.getItem(STORAGE_KEY);
        const parsed = safeParseJSON<SavedStepperState>(saved);
        return parsed?.providerId ?? null;
      })();

    if (!providerId) return;

    void axios
      .get<Provider>(`http://localhost:3000/provider/public/${providerId}`)
      .then((res) => setProvider(res.data))
      .catch((err) => console.error('Failed to fetch provider:', err));
  }, [state]);

  useEffect(() => {
    if (!provider?.serviceIds?.length) return;

    void axios
      .get<Service[]>('http://localhost:3000/service/public/services')
      .then((res) => {
        const filtered = res.data.filter((s: Service) =>
          provider.serviceIds.includes(s.id),
        );
        setAvailableServices(filtered);
      })
      .catch((err) => console.error('Failed to fetch services:', err));
  }, [provider]);

  //Continue stepper after login
  useEffect(() => {
    if (!loading && user.role !== Role.Guest && state?.fromLogin) {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      const parsed = safeParseJSON<SavedStepperState>(saved);
      if (parsed) {
        const restoredStep =
          parsed.selectedServiceId && parsed.selectedDate && parsed.selectedTime
            ? 2
            : parsed.activeStep || 0;

        setActiveStep(restoredStep);
        setProvider(parsed.provider || null);
        setService(parsed.service || null);
        setSelectedDate(parsed.selectedDate || null);
        setSelectedTime(parsed.selectedTime || null);
        setAcknowledged(parsed.acknowledged || false);
        setComments(parsed.comments || '');
      }
    }
  }, [loading, user.role, state]);

  const fetchAvailableTimes = async (date: string): Promise<void> => {
    if (!service?.id || !provider?.id) return;
    try {
      const res = await axios.get<string[]>(
        'http://localhost:3000/availability/slots',
        {
          params: {
            providerId: provider.id,
            serviceId: service.id,
            date,
          },
        },
      );
      setAvailableTimes(res.data);
    } catch (err) {
      console.error('Failed to fetch available times:', err);
      setAvailableTimes([]);
    }
  };

  const saveStateToStorage = useCallback((): void => {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        provider,
        activeStep,
        service,
        selectedDate,
        selectedTime,
        acknowledged,
        comments,
      }),
    );
  }, [
    provider,
    activeStep,
    service,
    selectedDate,
    selectedTime,
    acknowledged,
    comments,
  ]);

  const handleNext = useCallback((): void => {
    if (activeStep > 0 && !isLoggedIn) {
      saveStateToStorage();
      void navigate('/auth/login', { state: { from: location.pathname } });
      return;
    }
    setActiveStep((prev) => prev + 1);
  }, [activeStep, isLoggedIn, location.pathname, navigate, saveStateToStorage]);

  const handleBack = (): void => setActiveStep((prev) => prev - 1);

  useEffect(() => {
    if (selectedTime && activeStep === 1) {
      handleNext();
    }
  }, [selectedTime, activeStep, handleNext]);

  const handleConfirm = async (): Promise<void> => {
    if (!provider || !service || !selectedDate || !selectedTime) return;

    try {
      const start = dayjs(
        `${selectedDate} ${selectedTime}`,
        'YYYY-MM-DD HH:mm',
      );
      if (!start.isValid()) {
        console.error('Invalid start time', selectedDate, selectedTime);
        alert('Invalid date or time selected. Please try again.');
        return;
      }

      await axios.post('http://localhost:3000/appointments', {
        providerId: provider.id,
        serviceId: service.id,
        userId: user.userId,
        startTime: start.toISOString(),
        acknowledgment: acknowledged,
        comments: comments,
      });

      handleNext();
    } catch (err) {
      console.error('Failed to create appointment:', err);
      alert('Failed to book the appointment. Please try again.');
    }
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
          <StepService
            provider={provider}
            availableServices={availableServices}
            selectedServiceId={service?.id}
            onSelectService={setService}
            onNext={handleNext}
            filters={filters}
          />
        )}

        {activeStep === 1 && (
          <StepCalendar
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setSelectedTime={setSelectedTime}
            availableTimes={availableTimes}
            fetchAvailableTimes={(date) => void fetchAvailableTimes(date)}
            today={today}
            maxDate={maxDate}
            onBack={handleBack}
          />
        )}

        {activeStep === 2 && (
          <StepReview
            provider={provider as Provider}
            service={service as Service}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            acknowledged={acknowledged}
            comments={comments}
            setAcknowledged={setAcknowledged}
            setComments={setComments}
            onBack={handleBack}
            onConfirm={() => void handleConfirm()}
          />
        )}

        {activeStep === 3 && <StepConfirmation />}
      </Box>
    </Box>
  );
};

export default AppointmentBookingStepper;
