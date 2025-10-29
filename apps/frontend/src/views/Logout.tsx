import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared-models/enums/auth/role.enum';

const Logout = () => {
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const ranOnce = useRef(false);

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;

    localStorage.removeItem('token');
    sessionStorage.clear();

    updateUser({
      id: 0,
      name: 'Guest',
      email: '',
      role: Role.GUEST,
    });

    void navigate('/', { replace: true });
  }, [updateUser, navigate]);

  return null;
};

export default Logout;
