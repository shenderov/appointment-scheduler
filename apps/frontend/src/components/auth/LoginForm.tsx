import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import type { LoginDto as LoginRequest } from '@shared/models/dtos';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared/models/enums';
import type { User } from '@auth/context/AuthContextBase';

interface LoginResponse {
  access_token: string;
}

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
      const data: LoginRequest = { email, password };
      const res: AxiosResponse<LoginResponse> = await axios.post(
        'http://localhost:3000/auth/login',
        data,
      );

      const token = res.data.access_token;
      if (!token) {
        setError('No token received');
        return;
      }
      // Save token
      localStorage.setItem('token', token);

      // Fetch authenticated user
      const userRes: AxiosResponse<User> = await axios.get(
        'http://localhost:3000/users/me',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const user = userRes.data;
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
        case Role.Admin:
          void navigate('/admin');
          break;
        case Role.Provider:
          void navigate('/provider');
          break;
        case Role.Client:
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
