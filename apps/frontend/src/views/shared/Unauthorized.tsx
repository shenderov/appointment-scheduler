import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h5" color="error" gutterBottom>
        Access Denied
      </Typography>
      <Typography color="text.secondary" mb={3}>
        You don’t have permission to view this page.
      </Typography>
      <Button variant="contained" onClick={() => void navigate(-1)}>
        Go Back
      </Button>
    </Box>
  );
};

export default Unauthorized;
