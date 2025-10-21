import React from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProviderPublicResponseDto } from '@shared-models/src/dtos/providers/provider-public-response.dto';
import { ServicePublicResponseDto } from '@shared-models/src/dtos/services/service-public-response.dto';

interface StepServiceProps {
  provider: ProviderPublicResponseDto | null;
  availableServices: ServicePublicResponseDto[];
  selectedServiceId: number | undefined;
  onSelectService: (service: ServicePublicResponseDto) => void;
  onNext: () => void;
  filters?: {
    query?: string;
    service?: string;
    scrollY?: number;
  };
}

const StepService: React.FC<StepServiceProps> = ({
  provider,
  availableServices,
  selectedServiceId,
  onSelectService,
  onNext,
  filters,
}) => {
  const navigate = useNavigate();

  if (!provider) return null;

  return (
    <Box display="flex" flexDirection="column" gap={4}>
      <Box>
        <Typography variant="h6" gutterBottom>
          Select a Service from {provider.user.name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Please choose a service offered by the provider.
        </Typography>

        <Box
          display="grid"
          gridTemplateColumns={{
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
          }}
          gap={2}
        >
          {availableServices.map((service) => (
            <Paper
              key={service.id}
              onClick={() => onSelectService(service)}
              elevation={3}
              sx={{
                p: 2,
                border:
                  selectedServiceId === service.id
                    ? '2px solid #1976d2'
                    : '1px solid #ccc',
                cursor: 'pointer',
                transition: 'border-color 0.2s ease',
                '&:hover': { borderColor: '#1976d2' },
              }}
            >
              <Typography variant="subtitle1">{service.name}</Typography>
              <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                {service.durationMin} minutes
              </Typography>
            </Paper>
          ))}
        </Box>
      </Box>

      <Box display="flex" gap={2} mt={3}>
        <Button
          variant="outlined"
          onClick={() => {
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
          }}
        >
          Back to Search
        </Button>

        <Button
          variant="contained"
          onClick={onNext}
          disabled={!selectedServiceId}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default StepService;
