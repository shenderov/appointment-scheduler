import { useCallback, useEffect, useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared-models/enums/auth/role.enum';
import dayjs from 'dayjs';

import StepService from '@components/booking/stepper-steps/StepService';
import StepCalendar from '@components/booking/stepper-steps/StepCalendar';
import StepReview from '@components/booking/stepper-steps/StepReview';
import StepConfirmation from '@components/booking/stepper-steps/StepConfirmation';
import { fetchProviderById } from '@api/providers/providers.public';
import { fetchServices } from '@api/services/services.public';
import { fetchAvailableSlots } from '@api/providers/availability.public';
import { createAppointment } from '@api/appointments/appointments';
import { ProviderPublicResponseDto } from '@shared-models/src/dtos/providers/provider-public-response.dto';
import { ServicePublicResponseDto } from '@shared-models/src/dtos/services/service-public-response.dto';

const steps = ['Service', 'Calendar', 'Review', 'Confirmation'];
const STORAGE_KEY = 'appointment-stepper';

interface SavedStepperState {
  provider?: ProviderPublicResponseDto | null;
  activeStep?: number;
  service?: ServicePublicResponseDto | null;
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
  const [availableServices, setAvailableServices] = useState<
    ServicePublicResponseDto[]
  >([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [provider, setProvider] = useState<ProviderPublicResponseDto | null>(
    null,
  );
  const [service, setService] = useState<ServicePublicResponseDto | null>(null);
  const [activeStep, setActiveStep] = useState<number>(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState<boolean>(false);
  const [comments, setComments] = useState<string>('');
  const { user, loading } = useAuth();
  const isLoggedIn = user.role !== Role.GUEST;
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as SavedStepperState | undefined;
  const filters = state?.filters;

  const today = dayjs();
  const maxDate = today.add(60, 'day');

  useEffect(() => {
    const providerId =
      state?.providerId ??
      safeParseJSON<SavedStepperState>(sessionStorage.getItem(STORAGE_KEY))
        ?.providerId;

    if (!providerId) return;

    void fetchProviderById(Number(providerId))
      .then(setProvider)
      .catch((err) => console.error('Failed to fetch provider:', err));
  }, [state]);

  useEffect(() => {
    if (!provider?.serviceIds?.length) return;
    void fetchServices()
      .then((services) => {
        setAvailableServices(
          services.filter((s) => provider.serviceIds.includes(s.id)),
        );
      })
      .catch((err) => console.error('Failed to fetch services:', err));
  }, [provider]);

  //Continue stepper after login
  useEffect(() => {
    if (!loading && user.role !== Role.GUEST && state?.fromLogin) {
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
      const times = await fetchAvailableSlots(provider.id, service.id, date);
      setAvailableTimes(times);
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

    const start = dayjs(`${selectedDate} ${selectedTime}`, 'YYYY-MM-DD HH:mm');
    if (!start.isValid()) {
      alert('Invalid date or time selected.');
      return;
    }
    console.log('handleConfirm, user: ', user);
    await createAppointment({
      providerId: provider.id,
      serviceId: service.id,
      userId: user.id,
      startTime: start.toISOString(),
      acknowledgment: acknowledged,
      comments,
    });

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
            provider={provider as ProviderPublicResponseDto}
            service={service as ServicePublicResponseDto}
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
