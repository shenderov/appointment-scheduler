import { useEffect, useState } from 'react';
import axios from 'axios';
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

interface LocationState {
  query?: string;
  service?: string;
}

type Service = {
  id: string;
  name: string;
  duration_min: number;
};

type Provider = {
  id: string;
  profileImageUrl?: string;
  specialty: string;
  title: string;
  license: {
    licenseName: string;
    licenseNumber: string;
  };
  user: {
    id: string;
    name: string;
  };
  serviceIds: string[];
  bio?: string;
};

const Search = () => {
  const [query, setQuery] = useState('');
  const [service, setService] = useState('All Services');
  const [services, setServices] = useState<Service[]>([]);
  const [serviceOptions, setServiceOptions] = useState<string[]>([
    'All Services',
  ]);
  const [providers, setProviders] = useState<Provider[]>([]);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const location = useLocation();
  const state = location.state as LocationState | undefined;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get<Service[]>(
          'http://localhost:3000/service/public/services',
        );
        setServices(res.data);
        setServiceOptions(['All Services', ...res.data.map((s) => s.name)]);
      } catch (err) {
        console.error('Failed to fetch services:', err);
      }
    };

    const fetchProviders = async () => {
      try {
        const res = await axios.get<Provider[]>(
          'http://localhost:3000/provider/public/providers',
        );
        setProviders(res.data);
      } catch (err) {
        console.error('Failed to fetch providers:', err);
      }
    };

    void fetchServices();
    void fetchProviders();
    if (typeof state?.query === 'string') setQuery(state.query);
    if (typeof state?.service === 'string') setService(state.service);
  }, [state?.query, state?.service]);

  const getServiceNameById = (id: string) => {
    const service = services.find((s) => s.id === id);
    return service ? service.name : id;
  };

  const selectedService = services.find((s) => s.name === service);

  const filteredProviders = providers.filter((p) => {
    const matchesName = p.user.name.toLowerCase().includes(query.toLowerCase());

    const matchesService =
      service === 'All Services' ||
      p.serviceIds.includes(selectedService?.id || '');

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
            <Grid item xs={12} sm={6} md={4} key={p.id}>
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
