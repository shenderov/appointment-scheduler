import { Box, Typography, Stack, Link as MuiLink } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const Contact = () => {
  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: '#f9f9f9' }} id="contact">
      <Box maxWidth="md" mx="auto">
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Us
        </Typography>

        <Stack spacing={2} sx={{ mb: 4 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <LocationOnIcon color="action" />
            <Typography>123 Wellness St, Winnipeg, MB</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <PhoneIcon color="action" />
            <Typography>(204) 555-1234</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmailIcon color="action" />
            <MuiLink href="mailto:info@wellnesscareclinic.ca">
              info@wellnesscareclinic.ca
            </MuiLink>
          </Stack>
          <Typography>Clinic Hours: Mon–Fri 9am–6pm, Sat 10am–2pm</Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default Contact;
