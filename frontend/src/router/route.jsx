import { createBrowserRouter, Outlet } from 'react-router-dom'
import routeConfig from './routeConfig';
import ProtectedRoute from './ProtectedRoute';

const buildRoutes = (routes) => {
    return routes.map((route) => {
        const { path, element, allowedRoles, children } = route;

        const wrappedElement = allowedRoles ? (
            <ProtectedRoute allowedRoles={allowedRoles}>
                {element || <Outlet />}
            </ProtectedRoute>
        ) : (
            element || <Outlet />
        );

        return children
            ? {
                  path,
                  element: wrappedElement,
                  children: buildRoutes(children),
              }
            : {
                  path,
                  element: wrappedElement,
              };
    });
};


const router = createBrowserRouter(buildRoutes(routeConfig));

export default router;
