import { useState, useEffect } from 'react';
import { findCompany , createCompany} from "@/api/companyApi";
import { useAuth, useUser } from "@clerk/clerk-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "@/hooks/use-toast"
import { Toaster } from '@/components/ui/toaster';
import { Card } from '@/components/ui/card';

const Dashboard = () => {
  const { getToken } = useAuth()
  const { user, isLoaded } = useUser();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyProfilePic, setCompanyProfilePic] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      fetchDataForCompany();
    }
  }, []);

  const fetchDataForCompany = async () => {
    try {
      let token = await getToken();
      const res = await findCompany(user.id, token);
      if (!res.data) {
        setIsDialogOpen(true);
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch company data. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      let token = await getToken();
      const res = await createCompany({
        name: companyName,
        address: companyAddress,
        email: user.emailAddresses[0].emailAddress,
        profilePic: companyProfilePic,
        user: user.id
      }, token);
      console.log(res);
      if (res.status) {
        toast({
          title: "Success",
          description: "Company created successfully.",
        });
        setIsDialogOpen(false);
      } else {
        throw new Error(res.message || "Failed to create company");
      }
    } catch (error) {
      console.error("Error creating company:", error);
      toast({
        title: "Error",
        description: "Failed to create company. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen'>
      <Toaster/>
      <Dialog open={isDialogOpen} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Your Company</DialogTitle>
            <DialogDescription>
              Please provide your company details to get started. Email address will be the same address you used to sign in with Futurehire.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyEmail" className="text-right">
                  Email
                </Label>
                <p
                  className="col-span-3"
                  required
                >{user.emailAddresses[0].emailAddress}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyName" className="text-right">
                  Name
                </Label>
                <Input
                  id="companyName"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyAddress" className="text-right">
                  Address
                </Label>
                <Input
                  id="companyAddress"
                  value={companyAddress}
                  onChange={(e) => setCompanyAddress(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyProfilePic" className="text-right">
                  Profile Picture URL
                </Label>
                <Input
                  id="companyProfilePic"
                  type="url"
                  value={companyProfilePic}
                  onChange={(e) => setCompanyProfilePic(e.target.value)}
                  className="col-span-3"
                  required
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Company"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      <div className="p-6">
      <h1 className="text-3xl font-semibold mb-6">Your statistics</h1>
      
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
    </div>
  )
}

export default Dashboard
