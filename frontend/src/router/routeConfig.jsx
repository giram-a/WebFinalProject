import AdminDashboard from '@/pages/Admin/Dashboard'
import EmployerDashboard from '@/pages/Employer/Dashboard'
import JobSeekerDashboard from '@/pages/JobSeeker/Dashboard'
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ListAllCompanies from '@/pages/Admin/ListAllCompanies';
import CompanyDetails from '@/pages/Admin/CompanyDetails';

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
        element: <ListAllCompanies />
    },
    {
        path: "/company/:id",
        element: <CompanyDetails />
    },
    
    {
        path: "/admin",
        allowedRoles: ['ADMIN'],
        children: [
            { path: "dashboard", element: <AdminDashboard /> }
        ]
    },
    {
        path: "/employer",
        allowedRoles: ['EMPLOYER'],
        children: [
            { path: "dashboard", element: <EmployerDashboard /> }
        ]
    },
    {
        path: "/jobseeker",
        allowedRoles: ['JOB_SEEKER'],
        children: [
            { path: "dashboard", element: <JobSeekerDashboard /> }
        ]
    }
]

export default routeConfig;
