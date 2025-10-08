import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 10,
        px: 2,
      }}
    >
      <Typography variant="h3" fontWeight="bold" gutterBottom color="primary">
        404
      </Typography>
      <Typography variant="h5" gutterBottom>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={4}>
        The page you’re looking for doesn’t exist or has been moved.
      </Typography>

      <Box display="flex" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => void navigate('/')}
        >
          Go to Home
        </Button>
        <Button variant="outlined" onClick={() => void navigate(-1)}>
          Go Back
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
