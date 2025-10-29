import { useState, useRef } from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { searchClients } from '@api/users/users.admin';
import { UserResponseDto } from '@shared-models/src/dtos/users/user-response.dto';
import { ServicePublicResponseDto } from '@shared-models/src/dtos/services/service-public-response.dto';
import { ProviderPublicResponseDto } from '@shared-models/src/dtos/providers/provider-public-response.dto';
import { Role } from '@shared-models/src/enums/auth/role.enum';
import StepLayout from '@booking/components/stepper-steps/StepLayout';

interface StepUserProps {
  selectedClient: UserResponseDto | null;
  provider: ProviderPublicResponseDto;
  service: ServicePublicResponseDto;
  selectedDate: string | null;
  selectedTime: string | null;
  user?: UserResponseDto | null;
  fromLogin?: boolean;
  backStep: () => void;
  nextStep: () => void;
  setActiveStep: (step: number) => void;
  setSelectedClient: (client: UserResponseDto) => void;
  filters?: {
    query?: string;
    service?: string;
    scrollY?: number;
  };
}

const StepUser: React.FC<StepUserProps> = ({
  selectedClient,
  provider,
  service,
  selectedDate,
  selectedTime,
  user,
  fromLogin,
  nextStep,
  setActiveStep,
  setSelectedClient,
  filters,
}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [clients, setClients] = useState<UserResponseDto[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    setShowDropdown(!!value);
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    const trimmedValue = value.trim();
    if (trimmedValue.length < 2) {
      setClients([]);
      return;
    }

    setLoading(true);
    debounceTimeout.current = setTimeout(() => {
      void (async () => {
        try {
          const results = await searchClients(trimmedValue);
          setClients(results || []);
        } catch {
          setClients([]);
        } finally {
          setLoading(false);
        }
      })();
    }, 350);
  };

  const handleSelect = (client: UserResponseDto) => {
    setSelectedClient(client);
    setShowDropdown(false);
    setSearch('');
    setClients([]);
  };

  const handleBack = () => {
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
  };

  const handleNext = () => {
    if (
      fromLogin &&
      (user?.role === Role.ADMIN || user?.role === Role.PROVIDER) &&
      selectedClient &&
      provider &&
      service &&
      selectedDate &&
      selectedTime
    ) {
      setActiveStep(3);
    } else {
      nextStep();
    }
  };

  return (
    <StepLayout
      title="Select Client"
      onBack={handleBack}
      onNext={handleNext}
      nextDisabled={!selectedClient}
      backLabel="Back to Search"
    >
      <Box sx={{ position: 'relative', mt: 2 }}>
        <TextField
          fullWidth
          label="Search client by name or email"
          value={search}
          onChange={handleSearchChange}
          autoComplete="off"
        />
        {showDropdown && search && (
          <Paper
            elevation={3}
            sx={{
              position: 'absolute',
              zIndex: 10,
              left: 0,
              right: 0,
              mt: 1,
              maxHeight: 240,
              overflowY: 'auto',
            }}
          >
            <List dense disablePadding>
              {loading && (
                <ListItemButton disabled>
                  <ListItemText primary="Searching..." />
                </ListItemButton>
              )}
              {!loading && search.trim().length < 2 && (
                <ListItemButton disabled>
                  <ListItemText primary="Enter at least 2 characters to search" />
                </ListItemButton>
              )}
              {!loading &&
                search.trim().length >= 2 &&
                clients.length === 0 && (
                  <ListItemButton disabled>
                    <ListItemText primary="No results found" />
                  </ListItemButton>
                )}
              {clients.map((c) => (
                <ListItemButton key={c.id} onClick={() => handleSelect(c)}>
                  <ListItemText primary={c.name} secondary={c.email} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
      </Box>
      {selectedClient && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle1">
            Selected: {selectedClient.name} ({selectedClient.email})
          </Typography>
        </Box>
      )}
    </StepLayout>
  );
};

export default StepUser;
