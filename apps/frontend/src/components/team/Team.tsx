/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { useState } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import TeamMemberCard from '@components/team/TeamMemberCard';

const teamMembers = [
  { name: 'Dr. Alice Martin', role: 'Family Medicine' },
  { name: 'John Doe, RMT', role: 'Massage Therapist' },
  { name: 'Emily Zhang', role: 'Chiropractor' },
  { name: 'Dr. Samuel Lee', role: 'Acupuncturist' },
  { name: 'Sarah Connor', role: 'Nutritional Consultant' },
  { name: 'Dr. Rachel Green', role: 'Psychologist' },
  { name: 'James Carter', role: 'Physiotherapist' },
  { name: 'Linda Moore', role: 'Nurse Practitioner' },
  { name: 'Tom Wilson', role: 'Podiatrist' },
  { name: 'Maya Kapoor', role: 'Counselor' },
  { name: 'Daniel Kim', role: 'Dermatologist' },
  { name: 'Olivia Smith', role: 'Allergist' },
].map((member) => ({
  ...member,
  image: 'https://via.placeholder.com/150', // Replace later
}));

const Team: React.FC = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedMembers = showAll ? teamMembers : teamMembers.slice(0, 6);

  return (
    <Box sx={{ py: 8, px: 2, backgroundColor: '#f3f4f6' }} id="team">
      <Box maxWidth="lg" mx="auto">
        <Typography variant="h4" component="h2" gutterBottom>
          Meet Our Team
        </Typography>
        <Grid container spacing={3}>
          {displayedMembers.map((member) => (
            <Grid item xs={12} sm={6} md={4} key={member.name}>
              <TeamMemberCard {...member} />
            </Grid>
          ))}
        </Grid>

        {!showAll && (
          <Box textAlign="center" mt={4}>
            <Button variant="contained" onClick={() => setShowAll(true)}>
              See More
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Team;
