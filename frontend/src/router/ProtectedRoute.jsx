import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
    const { user, isSignedIn } = useUser();
    const location = useLocation();

    if (!isSignedIn) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    if (user && !allowedRoles.includes(user.publicMetadata.role)) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }
    return <Outlet />;
}
