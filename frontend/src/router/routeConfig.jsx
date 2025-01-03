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
import JobsList from '@/pages/Employer/JobsList';
import EditJob from '@/pages/Employer/EditJob';
import Resume from '@/pages/JobSeeker/Resume';
import ApplicantList from '@/pages/Employer/ApplicantList';
import LandingPage from '@/pages/Landing/LandingPage';

const routeConfig = [
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/login",
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
            { path: "add-job", element: <AddJob /> },
            { path: "jobs", element: <JobsList /> },
            { path: "editjob", element: <EditJob/> },
            { path: "applicants", element: <ApplicantList/> },
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
            { path: "resume", element: <Resume /> }
        ]
    }
]

export default routeConfig;
