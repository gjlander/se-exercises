import { Navigate, Outlet } from 'react-router';
import { useAuth } from '@/contexts';
import { Loading } from '@/components';

export default function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loading />;

  return !loading && !isAuthenticated ? <Navigate to='/login' /> : <Outlet />;
}
