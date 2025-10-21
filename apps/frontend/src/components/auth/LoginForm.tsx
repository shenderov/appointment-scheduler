import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared-models/enums/auth/role.enum';
import { LoginDto } from '@shared-models/dtos/auth/login.dto';
import { login, getCurrentUser } from '@api/auth/auth';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError('');

    try {
      const credentials: LoginDto = { email, password };

      const token = await login(credentials);
      if (!token) {
        setError('No token received');
        return;
      }
      localStorage.setItem('token', token);

      const user = await getCurrentUser();
      updateUser(user);

      const redirectTo = (location.state as { from?: string })?.from;
      if (redirectTo) {
        void navigate(redirectTo, {
          replace: true,
          state: { fromLogin: true },
        });
        return;
      }

      switch (user.role) {
        case Role.ADMIN:
          void navigate('/admin');
          break;
        case Role.PROVIDER:
          void navigate('/provider');
          break;
        case Role.CLIENT:
          void navigate('/client');
          break;
        default:
          void navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password');
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        component="form"
        onSubmit={(e) => void handleSubmit(e)}
        sx={{
          mt: 8,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Typography variant="h5" align="center">
          Login
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        <TextField
          label="Email"
          type="email"
          required
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <TextField
          label="Password"
          type="password"
          required
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button type="submit" variant="contained" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginForm;
