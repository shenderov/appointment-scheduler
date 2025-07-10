import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'grey.900',
        color: 'white',
        py: 4,
        mt: 12,
        textAlign: 'center',
        fontSize: '0.875rem',
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2">
          © {new Date().getFullYear()} WellnessCare Clinic. All rights
          reserved.
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          <Link
            href="/privacy"
            underline="hover"
            color="inherit"
            sx={{ '&:hover': { color: 'primary.light' } }}
          >
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link
            href="/terms"
            underline="hover"
            color="inherit"
            sx={{ '&:hover': { color: 'primary.light' } }}
          >
            Terms of Use
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
