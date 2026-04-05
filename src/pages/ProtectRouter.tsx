import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import Spinner from '@/components/Spinner';

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { signed, loading } = useContext(AuthContext);

  if (loading) return <Spinner />;

  if (!signed) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};