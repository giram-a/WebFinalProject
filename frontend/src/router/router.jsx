import AdminDashboard from '@/pages/Admin/Dashboard'
import EmployerDashboard from '@/pages/Employer/Dashboard'
import JobSeekerDashboard from '@/pages/JobSeeker/Dashboard'
import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: "/admin",
        children: [
            { path: "dashboard", element: <AdminDashboard /> }
        ]
    },
    {
        path: "/employer",
        children: [
            { path: "dashboard", element: <EmployerDashboard /> }
        ]
    },
    {
        path: "/jobseeker",
        children: [
            { path: "dashboard", element: <JobSeekerDashboard /> }
        ]
    }
])

export default router;
