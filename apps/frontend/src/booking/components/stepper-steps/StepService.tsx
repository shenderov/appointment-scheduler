import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProviderPublicResponseDto } from '@shared-models/src/dtos/providers/provider-public-response.dto';
import { ServicePublicResponseDto } from '@shared-models/src/dtos/services/service-public-response.dto';
import { UserResponseDto } from '@shared-models/src/dtos/users/user-response.dto';
import { Role } from '@shared-models/src/enums/auth/role.enum';
import StepLayout from '@booking/components/stepper-steps/StepLayout';

interface StepServiceProps {
  provider: ProviderPublicResponseDto | null;
  availableServices: ServicePublicResponseDto[];
  service: ServicePublicResponseDto | null;
  setService: (service: ServicePublicResponseDto) => void;
  nextStep: () => void;
  backStep: () => void;
  filters?: {
    query?: string;
    service?: string;
    scrollY?: number;
  };
  user?: UserResponseDto | null;
}

const StepService: React.FC<StepServiceProps> = ({
  provider,
  service,
  availableServices,
  setService,
  nextStep,
  backStep,
  filters,
  user,
}) => {
  const navigate = useNavigate();
  const role = user?.role || Role.CLIENT;

  const renderedServices = React.useMemo(() => {
    return availableServices.map((s) => (
      <Paper
        key={s.id}
        onClick={() => {
          setService(s);
        }}
        elevation={3}
        role="button"
        tabIndex={0}
        sx={{
          p: 2,
          border: service?.id === s.id ? '2px solid #1976d2' : '1px solid #ccc',
          cursor: 'pointer',
          transition: 'border-color 0.2s ease',
          '&:hover': { borderColor: '#1976d2' },
        }}
      >
        <Typography variant="subtitle1">{s.name}</Typography>
        <Typography variant="caption" display="block" sx={{ mt: 1 }}>
          {s.durationMin} minutes
        </Typography>
      </Paper>
    ));
  }, [availableServices, service, setService]);

  if (!provider) return null;

  const handleBack = () => {
    if (role === Role.CLIENT || role === Role.GUEST) {
      void navigate('/search', {
        state: {
          query: filters?.query || '',
          service: filters?.service || 'All Services',
        },
      });
      setTimeout(() => {
        if (filters?.scrollY !== undefined) {
          window.scrollTo(0, filters.scrollY);
        }
      }, 50);
    } else {
      backStep();
    }
  };

  const backLabel =
    role === Role.CLIENT || role === Role.GUEST ? 'Back to Search' : 'Back';

  return (
    <StepLayout
      title={`Select a Service from ${provider.user.name}`}
      description="Please choose a service offered by the provider."
      onBack={handleBack}
      onNext={nextStep}
      nextDisabled={!service}
      backLabel={backLabel}
    >
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
        }}
        gap={2}
      >
        {renderedServices}
      </Box>
    </StepLayout>
  );
};

export default StepService;
