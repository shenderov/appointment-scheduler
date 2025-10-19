import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@auth/hooks/useAuth';
import { Role } from '@shared-models/enums/auth/role.enum';

interface RequireAuthProps {
  allowedRoles?: Role[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  // if user.role is Guest, treat as unauthenticated
  if (!user || user.role === Role.GUEST) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // restrict by role if necessary
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
