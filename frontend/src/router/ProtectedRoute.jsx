import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoute({ allowedRoles, userRole }) {
    if (!allowedRoles.includes(userRole)) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
}
