import AdminDashboard from '@/pages/Admin/Dashboard'
import EmployerDashboard from '@/pages/Employer/Dashboard'
import Home from '@/pages/Login';
import JobSeekerDashboard from '@/pages/JobSeeker/Dashboard'
import Signup from '@/pages/Signup';

const routeConfig = [
    {
        path: "/",
        element: <Home />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/admin",
        allowedRoles: ['admin'],
        children: [
            { path: "dashboard", element: <AdminDashboard /> }
        ]
    },
    {
        path: "/employer",
        allowedRoles: ['employer'],
        children: [
            { path: "dashboard", element: <EmployerDashboard /> }
        ]
    },
    {
        path: "/jobseeker",
        allowedRoles: ['jobseeker'],
        children: [
            { path: "dashboard", element: <JobSeekerDashboard /> }
        ]
    }
]

export default routeConfig;
