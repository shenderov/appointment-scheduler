import { Box, Button, Grid, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
// import heroImage from '@/assets/hero.jpg'; // Replace with actual image path

const Hero = () => {
  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        backgroundColor: 'background.paper',
      }}
    >
      <Grid container spacing={4} alignItems="center">
        {/* Text content */}
        <Grid item xs={12} md={6}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: 'bold' }}
          >
            Your Health. Our Priority.
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Compassionate care, experienced staff, and modern treatments — all
            under one roof.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            color="primary"
            component={RouterLink}
            to="/search"
          >
            Book Your Appointment Now
          </Button>
        </Grid>

        {/* Hero image */}
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src="https://picsum.photos/id/237/200/300"
            alt="Healthcare team"
            sx={{
              width: '100%',
              borderRadius: 2,
              boxShadow: 3,
              maxHeight: 400,
              objectFit: 'cover',
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
