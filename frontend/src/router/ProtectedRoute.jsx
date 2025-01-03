import { useUser } from '@clerk/clerk-react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles, children }) {
    const { isLoaded, user, isSignedIn } = useUser();
    const location = useLocation();

    if(!isLoaded){
        return <>Loading...</>
    }

    if (!isSignedIn) {
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    if (user && !allowedRoles.includes(user.publicMetadata.role)) {
        console.log("No valid role");
        return <Navigate to="/login" replace state={{ from: location }} />;
    }
    return children ? children : <Outlet />;
}
