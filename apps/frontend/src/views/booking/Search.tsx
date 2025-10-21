import { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Card,
  CardContent,
  CardMedia,
  Button,
  Collapse,
  Divider,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { fetchServices } from '@api/services/services.public';
import { fetchProviders } from '@api/providers/providers.public';
import { ProviderPublicResponseDto } from '@shared-models/src/dtos/providers/provider-public-response.dto';
import { ServicePublicResponseDto } from '@shared-models/src/dtos/services/service-public-response.dto';

interface LocationState {
  query?: string;
  service?: string;
}

const Search = () => {
  const [query, setQuery] = useState('');
  const [service, setService] = useState('All Services');
  const [services, setServices] = useState<ServicePublicResponseDto[]>([]);
  const [serviceOptions, setServiceOptions] = useState<string[]>([
    'All Services',
  ]);
  const [providers, setProviders] = useState<ProviderPublicResponseDto[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const location = useLocation();
  const state = location.state as LocationState | undefined;

  useEffect(() => {
    const loadData = async () => {
      try {
        const [servicesData, providersData] = await Promise.all([
          fetchServices(),
          fetchProviders(),
        ]);
        setServices(servicesData);
        setServiceOptions(['All Services', ...servicesData.map((s) => s.name)]);
        setProviders(providersData);
      } catch (err) {
        console.error('Failed to load search data:', err);
      }
    };

    void loadData();
    if (typeof state?.query === 'string') setQuery(state.query);
    if (typeof state?.service === 'string') setService(state.service);
  }, [state?.query, state?.service]);

  const getServiceNameById = (id: number) =>
    services.find((s) => s.id === id)?.name || id;

  const selectedService = services.find((s) => s.name === service);

  const filteredProviders = providers.filter((p) => {
    const matchesName = p.user.name.toLowerCase().includes(query.toLowerCase());
    const matchesService =
      service === 'All Services' ||
      p.serviceIds.includes(selectedService?.id ?? -1);
    return matchesName && matchesService;
  });

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
            <Grid xs={12} sm={6} md={4} key={p.id}>
              <Card
                variant="outlined"
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  component="img"
                  height="140"
                  image={p.profileImageUrl || 'https://placehold.co/300x140'}
                  alt={p.user.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" fontWeight="bold">
                    {p.user.name}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {p.specialty}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {p.license.licenseName} — #{p.license.licenseNumber}
                  </Typography>

                  <Button
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() =>
                      setExpandedCard((prev) => (prev === p.id ? null : p.id))
                    }
                  >
                    {expandedCard === p.id ? 'Hide Bio' : 'Show Bio'}
                  </Button>

                  <Collapse in={expandedCard === p.id}>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2" color="text.secondary">
                      {p.bio || 'No bio available.'}
                    </Typography>

                    {p.serviceIds?.length > 0 && (
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                          Services:
                        </Typography>
                        <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                          {p.serviceIds.map((id) => (
                            <li key={id}>
                              <Typography variant="body2">
                                {getServiceNameById(id)}
                              </Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    )}
                  </Collapse>

                  <Button
                    variant="contained"
                    fullWidth
                    sx={{ mt: 2 }}
                    component={RouterLink}
                    to="/booking"
                    state={{
                      providerId: p.id,
                      filters: {
                        query,
                        service,
                        scrollY: window.scrollY,
                      },
                    }}
                  >
                    View Availability
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Search;
