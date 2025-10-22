import { Box, Typography, Paper, Grid } from '@mui/material';

const ProviderDashboard = () => (
  <Box>
    <Typography variant="h4" gutterBottom>
      Provider Dashboard
    </Typography>

    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={4}>
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle1">Upcoming Appointment</Typography>
          <Typography>Oct 7, 10:00 AM with Joe Doe</Typography>
        </Paper>
      </Grid>
    </Grid>
  </Box>
);

export default ProviderDashboard;
