import { useCallback, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { useLocation, useNavigate } from 'react-router-dom';
import { Role } from '@shared-models/enums/auth/role.enum';
import { useAuth } from '@auth/hooks/useAuth';
import { fetchServices } from '@api/services/services.public';
import { fetchAvailableSlots } from '@api/providers/availability.public';
import {
  createAppointment,
  createAppointmentAsAdmin,
} from '@api/appointments/appointments';
import type { ProviderPublicResponseDto } from '@shared-models/src/dtos/providers/provider-public-response.dto';
import type { ServicePublicResponseDto } from '@shared-models/src/dtos/services/service-public-response.dto';
import { UserResponseDto } from '@shared-models/src/dtos/users/user-response.dto';

const STORAGE_KEY = 'appointment-stepper';

interface SavedStepperState {
  provider?: ProviderPublicResponseDto | null;
  availableServices?: ServicePublicResponseDto[] | null;
  activeStep?: number;
  service?: ServicePublicResponseDto | null;
  availableTimes?: string[] | null;
  selectedDate?: string | null;
  selectedTime?: string | null;
  acknowledged?: boolean;
  comments?: string;
  fromLogin?: boolean;
}

export function useAppointmentStepper() {
  const navigate = useNavigate();
  const location = useLocation();
  const today = dayjs(new Date());
  const state = location.state as SavedStepperState | undefined;
  const [availableServices, setAvailableServices] = useState<
    ServicePublicResponseDto[]
  >([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [provider, setProvider] = useState<ProviderPublicResponseDto | null>(
    null,
  );
  const [service, setService] = useState<ServicePublicResponseDto | null>(null);
  const [selectedClient, setSelectedClient] = useState<UserResponseDto | null>(
    null,
  );
  const [activeStep, setActiveStep] = useState(0);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [approve, setApprove] = useState(false);
  const [comments, setComments] = useState('');
  const { user, loading } = useAuth();
  const isLoggedIn = user.role !== Role.GUEST;
  const [fromLogin, setFromLogin] = useState(false);

  useEffect(() => {
    const fromLogin =
      (location.state as { fromLogin?: boolean })?.fromLogin ?? false;

    if (fromLogin) {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as SavedStepperState;
          const step = user.role === Role.CLIENT ? parsed.activeStep : 0;
          setProvider(parsed.provider || null);
          setAvailableServices(parsed.availableServices || []);
          setActiveStep(step || 0);
          setService(parsed.service || null);
          setAvailableTimes(parsed.availableTimes || []);
          setSelectedDate(parsed.selectedDate || null);
          setSelectedTime(parsed.selectedTime || null);
          setFromLogin(true);
          return;
        } catch (error) {
          console.error('Failed to parse saved stepper state:', error);
        }
      }
    } else {
      if (sessionStorage.getItem(STORAGE_KEY)) {
        sessionStorage.removeItem(STORAGE_KEY);
      }
    }
    if (state?.provider) {
      setProvider(state?.provider);
    }
    if (state?.availableServices) {
      setAvailableServices(state?.availableServices);
    }
  }, [location.state, state, user.role]);

  useEffect(() => {
    if (!provider?.serviceIds?.length) return;
    if (availableServices.length === 0) {
      void fetchServices().then((services) =>
        setAvailableServices(
          services.filter((s) => provider.serviceIds.includes(s.id)),
        ),
      );
    }
  }, [availableServices, provider]);

  const fetchTimes = async (date: string) => {
    if (!service?.id || !provider?.id) return;
    const times = await fetchAvailableSlots(provider.id, service.id, date);
    setAvailableTimes(times);
  };

  useEffect(() => {
    if (!provider && !service && !selectedDate && !selectedTime) return;

    const currentState: SavedStepperState = {
      provider,
      activeStep,
      service,
      availableTimes,
      availableServices,
      selectedDate,
      selectedTime,
      acknowledged,
      comments,
    };

    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(currentState));
  }, [
    provider,
    activeStep,
    service,
    availableTimes,
    availableServices,
    selectedDate,
    selectedTime,
    acknowledged,
    comments,
  ]);

  const nextStep = useCallback(() => {
    if (activeStep > 0 && !isLoggedIn) {
      void navigate('/auth/login', { state: { from: location.pathname } });
    }
    setActiveStep((prev) => prev + 1);
  }, [activeStep, isLoggedIn, location.pathname, navigate]);

  const backStep = useCallback(() => setActiveStep((prev) => prev - 1), []);

  const confirm = async () => {
    if (!provider || !service || !selectedDate || !selectedTime) return;
    const start = dayjs(`${selectedDate} ${selectedTime}`, 'YYYY-MM-DD HH:mm');
    const appointment = {
      providerId: provider.id,
      serviceId: service.id,
      userId:
        (user.role === Role.ADMIN || user.role === Role.PROVIDER) &&
        selectedClient !== null
          ? selectedClient.id
          : user.id,
      startTime: start.toISOString(),
      acknowledgment: acknowledged,
      comments,
    };
    if (user.role === Role.CLIENT) {
      await createAppointment(appointment);
    } else {
      await createAppointmentAsAdmin(appointment, approve);
    }
    nextStep();
  };

  return {
    steps: [],
    activeStep,
    provider,
    service,
    selectedClient,
    availableServices,
    availableTimes,
    selectedDate,
    selectedTime,
    acknowledged,
    approve,
    comments,
    loading,
    isLoggedIn,
    setService,
    setActiveStep,
    setSelectedClient,
    setSelectedDate,
    setSelectedTime,
    setAcknowledged,
    setApprove,
    setComments,
    fetchTimes,
    nextStep,
    backStep,
    confirm,
    today,
    user,
    fromLogin,
  };
}
