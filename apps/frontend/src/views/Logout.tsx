import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@context/AuthContext';
import { Role } from '@shared/models/enums';

const Logout = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  useEffect(() => {
    localStorage.removeItem('token');
    updateUser({ name: 'Guest', role: Role.Guest });
    navigate('/');
  }, [updateUser, navigate]);

  return null;
};

export default Logout;
