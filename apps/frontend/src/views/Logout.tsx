import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared/models/enums';

const Logout = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  useEffect(() => {
    localStorage.removeItem('token');
    updateUser({ name: 'Guest', role: Role.Guest });
    void navigate('/');
  }, [updateUser, navigate]);

  return null;
};

export default Logout;
