import { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Alert,
  Link,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared-models/enums/auth/role.enum';
import { login, getCurrentUser, signup } from '@api/auth/auth';
import type { LoginDto } from '@shared-models/dtos/auth/login.dto';
import { LoginResponseDto } from '@shared-models/src/dtos/auth/login-response.dto';

const AuthForm = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    setError('');
    let token: LoginResponseDto | null = null;
    try {
      if (isSignup) {
        if (
          !form.firstName ||
          !form.lastName ||
          !form.email ||
          !form.password
        ) {
          setError('All fields are required.');
          return;
        }

        // Call signup API (to be implemented backend-side)
        token = await signup({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
        });
      } else {
        const credentials: LoginDto = {
          email: form.email,
          password: form.password,
        };
        token = await login(credentials);
      }

      // Proceed to login after signup or directly for existing users
      // const credentials: LoginDto = {
      //   email: form.email,
      //   password: form.password,
      // };

      // const token = await login(credentials);
      if (!token) {
        setError('No token received');
        return;
      }
      localStorage.setItem('token', token.access_token);

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
      console.error('Auth error:', err);
      setError(isSignup ? 'Signup failed' : 'Invalid email or password');
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
          {isSignup ? 'Create Account' : 'Login'}
        </Typography>

        {error && <Alert severity="error">{error}</Alert>}

        {isSignup && (
          <>
            <TextField
              label="First Name"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required
              fullWidth
            />
          </>
        )}

        <TextField
          label="Email"
          name="email"
          type="email"
          required
          fullWidth
          value={form.email}
          onChange={handleChange}
        />

        <TextField
          label="Password"
          name="password"
          type="password"
          required
          fullWidth
          value={form.password}
          onChange={handleChange}
        />

        <Button type="submit" variant="contained" fullWidth>
          {isSignup ? 'Sign Up' : 'Login'}
        </Button>

        <Typography variant="body2" align="center">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <Link
            component="button"
            variant="body2"
            onClick={() => setIsSignup((prev) => !prev)}
          >
            {isSignup ? 'Log In' : 'Sign Up'}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthForm;
