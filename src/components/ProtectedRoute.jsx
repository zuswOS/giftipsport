import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/SupabaseAuthContext';

const ProtectedRoute = ({ children, role }) => {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
            </div>
        );
    }
    
    if (!user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    if (role && profile?.role !== role) {
        if (profile?.role === 'cliente') {
            return <Navigate to="/dashboard" replace />;
        }
        if (profile?.role === 'asesor') {
            return <Navigate to="/advisor-dashboard" replace />;
        }
        return <Navigate to="/" replace />;
    }
    
    return children;
};

export default ProtectedRoute;