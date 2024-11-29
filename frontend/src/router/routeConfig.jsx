import AdminDashboard from '@/pages/Admin/Dashboard'
import EmployerDashboard from '@/pages/Employer/Dashboard'
import JobSeekerDashboard from '@/pages/JobSeeker/Dashboard'
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';

const routeConfig = [
    {
        path: "/",
        element: <Login/>
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
