import { Card } from "@/components/ui/card";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-blue-50 shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700">No of Users</h2>
          <p className="text-2xl font-bold text-blue-600">1,234</p>
        </Card>

        <Card className="bg-green-50 shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700">No of Jobs</h2>
          <p className="text-2xl font-bold text-green-600">345</p>
        </Card>

        <Card className="bg-yellow-50 shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700">No of Employers</h2>
          <p className="text-2xl font-bold text-yellow-600">78</p>
        </Card>

        <Card className="bg-purple-50 shadow-md p-6 rounded-lg">
          <h2 className="text-lg font-medium text-gray-700">No of Resumes</h2>
          <p className="text-2xl font-bold text-purple-600">2,456</p>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
