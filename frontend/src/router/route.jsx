import { createBrowserRouter } from 'react-router-dom'
import routeConfig from './routeConfig';
import ProtectedRoute from './ProtectedRoute';

const userRole = 'admin';

const buildRoutes = (routes) => {
    return routes.map((route) => {
        if (route.children) {
            return {
                path: route.path,
                element: route.allowedRoles ? (
                    <ProtectedRoute allowedRoles={route.allowedRoles} userRole={userRole} />
                ) : (
                    <Outlet />
                ),
                children: buildRoutes(route.children),
            };
        }
        return { path: route.path, element: route.element };
    });
};


const router = createBrowserRouter(buildRoutes(routeConfig));

export default router;
