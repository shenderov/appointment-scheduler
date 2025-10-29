import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Collapse,
  Divider,
  Box,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ProviderPublicResponseDto } from '@shared-models/src/dtos/providers/provider-public-response.dto';
import { ServicePublicResponseDto } from '@shared-models/src/dtos/services/service-public-response.dto';

interface ProviderCardProps {
  provider: ProviderPublicResponseDto;
  expanded: boolean;
  onToggle: (id: number) => void;
  services: ServicePublicResponseDto[];
}

const ProviderCard = ({
  provider,
  expanded,
  onToggle,
  services,
}: ProviderCardProps) => {
  const availableServices = services.filter((s) =>
    provider.serviceIds.includes(s.id),
  );

  return (
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
        image={provider.profileImageUrl || 'https://placehold.co/300x140'}
        alt={provider.user.name}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {provider.user.name}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {provider.specialty}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {provider.license.licenseName} — #{provider.license.licenseNumber}
        </Typography>

        <Button
          size="small"
          sx={{ mt: 2 }}
          onClick={() => onToggle(provider.id)}
          aria-expanded={expanded}
        >
          {expanded ? 'Hide Bio' : 'Show Bio'}
        </Button>

        <Collapse in={expanded}>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2" color="text.secondary">
            {provider.bio || 'No bio available.'}
          </Typography>

          {provider.serviceIds?.length > 0 && (
            <Box sx={{ mt: 1 }}>
              <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
                Services:
              </Typography>
              <ul style={{ margin: 0, paddingLeft: '1rem' }}>
                {provider.serviceIds.map((id) => {
                  const service = availableServices.find((s) => s.id === id);
                  return (
                    <li key={id}>
                      <Typography variant="body2">
                        {service ? service.name : `Service #${id}`}
                      </Typography>
                    </li>
                  );
                })}
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
            provider,
            availableServices,
            fromLogin: false,
            filters: {
              query: '',
              service: '',
              scrollY: window.scrollY,
            },
          }}
        >
          View Availability
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;
