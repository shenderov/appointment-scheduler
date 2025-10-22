import { Box, Typography, Paper, Grid } from '@mui/material';

const ClientDashboard = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Welcome Back!
    </Typography>

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1">Upcoming Appointment</Typography>
          <Typography>Oct 7, 10:00 AM with Dr. Smith</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1">Insurance</Typography>
          <Typography>Active — BlueCross #12345</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1">Last Visit</Typography>
          <Typography>Sep 12, Dr. Lee</Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default ClientDashboard;
