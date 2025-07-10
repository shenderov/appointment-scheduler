import { Box, Container, Typography } from '@mui/material';

const About = () => {
  return (
    <Box component="section" sx={{ py: 12, bgcolor: 'grey.100' }}>
      <Container maxWidth="md">
        <Typography
          variant="h4"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          About Our Clinic
        </Typography>

        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ lineHeight: 1.8 }}
        >
          WellnessCare Clinic has been serving the community for over 15 years,
          offering a wide range of health services from preventive care to
          specialized treatments. Our mission is to provide high-quality
          healthcare in a warm and welcoming environment.
        </Typography>
      </Container>
    </Box>
  );
};

export default About;
