import { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import type { LoginDto as LoginRequest } from '@shared/models/dtos';
import { useAuth } from '@context/AuthContext';
import { Role } from '@shared/models/enums';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const data: LoginRequest = { email, password };
      const res = await axios.post('http://localhost:3000/auth/login', data);

      const token = res.data?.access_token;
      if (token) {
        localStorage.setItem('token', token);

        // Fetch current user
        const userRes = await axios.get('http://localhost:3000/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        updateUser(userRes.data);

        // Redirect based on role
        switch (userRes.data.role) {
          case Role.Admin:
          case Role.Provider:
            navigate('/dashboard');
            break;
          case Role.Client:
            navigate('/profile');
            break;
          default:
            navigate('/');
        }
      } else {
        setError('No token received');
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
        onSubmit={handleSubmit}
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
