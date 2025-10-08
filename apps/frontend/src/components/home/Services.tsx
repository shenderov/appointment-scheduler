import { Grid, Typography, Box } from '@mui/material';
import ServiceCard from '@components/home/ServiceCard';

const services = [
  {
    title: 'Massage Therapy',
    description:
      'Licensed massage therapists offering relaxation and injury care.',
  },
  {
    title: 'Acupuncture',
    description:
      'Targeted acupuncture treatments to relieve pain and improve wellness.',
  },
  {
    title: 'Chiropractic',
    description: 'Expert spinal adjustments and posture care.',
  },
  {
    title: 'Physiotherapy',
    description: 'Personalized therapy plans to support recovery and mobility.',
  },
  {
    title: 'Nutritional Consulting',
    description: 'Custom nutrition plans for optimal health and wellness.',
  },
  {
    title: 'Foot Care',
    description:
      'Professional foot assessments and treatment of common foot issues.',
  },
];

const Services: React.FC = () => {
  return (
    <Box id="services" sx={{ py: 8, px: 2, backgroundColor: '#f3f4f6' }}>
      <Box maxWidth="lg" mx="auto">
        <Typography variant="h4" component="h2" gutterBottom>
          Our Services
        </Typography>
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.title}>
              <ServiceCard
                title={service.title}
                description={service.description}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Services;
