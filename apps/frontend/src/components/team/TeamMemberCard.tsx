import { Card, CardContent, CardMedia, Typography } from '@mui/material';

interface TeamMemberCardProps {
  name: string;
  role: string;
  image: string;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({
  name,
  role,
  image,
}) => {
  return (
    <Card variant="outlined" sx={{ textAlign: 'center', borderRadius: 2 }}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={name}
        sx={{ objectFit: 'cover', p: 2 }}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {role}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default TeamMemberCard;
