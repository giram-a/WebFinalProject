import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { getAdminStats } from "@/api/statsApi";
const Dashboard = () => {
  const { getToken } = useAuth();
  const [stats,setStats] = useState({
    userCount: 0,
    jobCount: 0,
    employerCount: 0,
    resumeCount: 0
  });
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = await getToken();
        const response = await getAdminStats(token);
        const data = response.data.data;
        setStats(data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStats();
  },[]);
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700">No of Users</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.userCount}</p>
        </Card>

        <Card className="bg-green-50 shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700">No of Jobs</h2>
          <p className="text-2xl font-bold text-green-600">{stats.jobCount}</p>
        </Card>

        <Card className="bg-yellow-50 shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700">No of Employers</h2>
          <p className="text-2xl font-bold text-yellow-600">{stats.employerCount}</p>
        </Card>

        <Card className="bg-purple-50 shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700">No of Resumes</h2>
          <p className="text-2xl font-bold text-purple-600">{stats.resumeCount}</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
