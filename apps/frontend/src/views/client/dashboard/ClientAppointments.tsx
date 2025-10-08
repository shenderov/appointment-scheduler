import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Typography,
} from '@mui/material';

type AppointmentStatus = 'scheduled' | 'cancelled' | 'completed';

type Service = {
  id: number;
  name: string;
  description: string;
  duration_min: number;
};

type Provider = {
  id: number;
  user: {
    id: number;
    name: string;
  };
  specialty: string;
  title: string;
};

type User = {
  id: number;
  name: string;
};

type Appointment = {
  id: number;
  provider: Provider;
  userId: number;
  user: User;
  service: Service;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
  comments?: string;
};

const ClientAppointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Missing authentication token');
          setLoading(false);
          return;
        }

        const res = await axios.get<Appointment[]>(
          'http://localhost:3000/appointments',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: false,
          },
        );

        setAppointments(res.data);
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          console.error('Failed to fetch appointments:', err);
          if (err.response?.status === 401) {
            setError('Unauthorized — please log in again.');
          } else {
            setError(err.message || 'Failed to load appointments.');
          }
        } else {
          setError('An unexpected error occurred.');
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchAppointments();
  }, []);

  if (loading) return <Typography>Loading appointments...</Typography>;
  if (error) return <Typography color="error">Error: {error}</Typography>;

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Appointments
      </Typography>
      <Typography variant="body1" gutterBottom>
        Clients can search, create, update, or cancel own appointments.
      </Typography>

      {appointments.length === 0 ? (
        <Typography>No appointments found.</Typography>
      ) : (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Provider</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>Appointment Time</TableCell>
              <TableCell>Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {appointments.map((a) => (
              <React.Fragment key={a.id}>
                <TableRow hover>
                  <TableCell>{a.id}</TableCell>
                  <TableCell>{a.provider?.user?.name || 'Unknown'}</TableCell>
                  <TableCell>{a.service?.name}</TableCell>
                  <TableCell>
                    {dayjs(a.startTime).format('YYYY-MM-DD HH:mm')}
                  </TableCell>
                  <TableCell>{a.status}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} sx={{ bgcolor: 'grey.100' }}>
                    <Typography
                      variant="body2"
                      component="div"
                      sx={{ mb: 0.5 }}
                    >
                      <strong>Comments:</strong> {a.comments || 'None'}
                    </Typography>
                    <Typography variant="body2" component="div">
                      <strong>Booked For:</strong> {a.user?.name || 'Unknown'}
                    </Typography>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      )}
    </Paper>
  );
};

export default ClientAppointments;
