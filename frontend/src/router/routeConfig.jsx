import Navbar from '@/components/common/Navbar';
import Sidebar from '@/components/common/Sidebar';
import AdminDashboard from '@/pages/Admin/Dashboard'
import AddJob from '@/pages/Employer/AddJob';
import EmployerDashboard from '@/pages/Employer/Dashboard'
import Applications from '@/pages/JobSeeker/Applications';
import Jobs from '@/pages/JobSeeker/Jobs';
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import EmployerList from '@/pages/Admin/EmployerList';
import { Outlet } from 'react-router-dom';
import PremiumComponent from '@/pages/JobSeeker/PremiumComponent';
import CheckoutForm from '@/pages/JobSeeker/CheckoutForm';
import ReturnComponent from '@/pages/JobSeeker/ReturnComponent';
import Gemini from '@/pages/JobSeeker/Gemini';

const routeConfig = [
    {
        path: "/",
        element: <Login />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/admin",
        allowedRoles: ['ADMIN'],
        element: <Sidebar role={"ADMIN"} />,
        children: [
            { path: "", element: <AdminDashboard /> },
            { path: "employers", element: <EmployerList /> }
        ]
    },
    {
        path: "/employer",
        allowedRoles: ['EMPLOYER'],
        element: <Sidebar role={"EMPLOYER"} />,
        children: [
            { path: "", element: <EmployerDashboard /> },
            { path: "add-job", element: <AddJob /> }
        ]
    },
    {
        path: "/jobseeker",
        allowedRoles: ['JOB_SEEKER'],
        element: <><Navbar /><Outlet /></>,
        children: [
            { path: "", element: <Jobs /> },
            { path: "applications", element: <Applications /> },
            { path: "premium", element: <PremiumComponent /> },
            { path: "checkout", element: <CheckoutForm /> },
            { path: "return", element: <ReturnComponent /> },
            { path: "gemini", element: <Gemini /> }
        ]
    }
]

export default routeConfig;
