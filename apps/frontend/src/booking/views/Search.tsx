import { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  MenuItem,
  Grid,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useSearchData } from '@booking/hooks/useSearchData';
import ProviderCard from '@booking/components/search/ProviderCard';
import type { LocationState } from '@booking/types/search';

const Search = () => {
  const location = useLocation();
  const state = location.state as LocationState | undefined;
  const [query, setQuery] = useState(state?.query || '');
  const [service, setService] = useState(state?.service || 'All Services');
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const { services, providers, loading } = useSearchData();
  const serviceOptions = ['All Services', ...services.map((s) => s.name)];

  const filteredProviders = useMemo(() => {
    const selectedService = services.find((s) => s.name === service);
    return providers.filter((p) => {
      const matchesName = p.user.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesService =
        service === 'All Services' ||
        p.serviceIds.includes(selectedService?.id ?? -1);
      return matchesName && matchesService;
    });
  }, [providers, query, service, services]);

  if (loading) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography>Loading specialists...</Typography>
      </Container>
    );
  }

  if (!providers.length) {
    return (
      <Container sx={{ py: 8, textAlign: 'center' }}>
        <Typography>No providers found.</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 6, backgroundColor: '#f5f7fa' }}>
      <Container>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Find a Specialist
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
          <TextField
            label="Provider name..."
            variant="outlined"
            fullWidth
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <TextField
            select
            label="All Services"
            value={service}
            onChange={(e) => setService(e.target.value)}
            sx={{ minWidth: 200 }}
          >
            {serviceOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <Grid container spacing={3}>
          {filteredProviders.map((p) => (
            <Grid item xs={12} sm={6} md={4} key={p.id}>
              <ProviderCard
                provider={p}
                expanded={expandedCard === p.id}
                onToggle={(id) =>
                  setExpandedCard(expandedCard === id ? null : id)
                }
                services={services}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Search;
