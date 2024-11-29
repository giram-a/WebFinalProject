import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles }) {
    const { isLoaded, user, isSignedIn } = useUser();
    const location = useLocation();

    if(!isLoaded){
        return <>Loading...</>
    }

    if (!isSignedIn) {
        return <Navigate to="/" replace state={{ from: location }} />;
    }

    if (user && !allowedRoles.includes(user.publicMetadata.role)) {
        console.log("No valid role");
        return <Navigate to="/" replace state={{ from: location }} />;
    }
    return <Outlet />;
}
