import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast.js'
import { Toaster } from '@/components/ui/toaster'
import { getJobById, updateJob } from '@/api/jobsApi'
import { useAuth, useUser, useClerk } from '@clerk/clerk-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useNavigate } from 'react-router-dom'
import { findCompany } from '@/api/companyApi'

const EditJob = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const jobId = urlParams.get('id');
    console.log(jobId);
  const { getToken } = useAuth();
  const { user, isLoaded } = useUser();
  const { signOut } = useClerk();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  const initialFormState = {
    companyName: "",
    jobTitle: "",
    description: "",
    salary: "",
    location: "",
    skills: "",
    applyLink: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  const { toast } = useToast();

  useEffect(() => {
    if (isLoaded && user) {
      fetchDataForCompany();
    }
  }, [isLoaded, user]);
    
  const fetchDataForCompany = async () => {
    try {
      // console.log(user)
      let token = await getToken();
      const res = await getJobById(jobId, token);
      const company = await findCompany(user.id, token);
      console.log(company);
      // if (company.data.accessStatus === "PENDING") {
      //   setIsDialogOpen(true);
      // }
      // console.log(res.data.data);
      setFormData(res.data.data);
    } catch (error) {
      console.error("Error fetching job data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch job data. Please go back to old page.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let token = await getToken();
    const res = await updateJob({...formData},jobId, token)
    if(res.status){
        navigate("/employer/jobs");
    }else{
      toast({
        description: "Something went wrong",
      })
    }
  };

  const handleLogout = async () => {
    await signOut();
    // Redirect to login page or home page after logout
    // You might want to use react-router's useNavigate hook for this
    // navigate('/login');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Toaster />
        <Card className="w-full max-w-2xl mx-auto border shadow-none">
          <CardHeader>
            <CardTitle>Job Posting Form</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex md:flex-nowrap justify-between gap-2 xs:flex-wrap">
              <div className="space-y-2 w-full">
                <Label htmlFor="companyName">Company Name *</Label>
                <Input id="companyName"
                  placeholder="Enter company name"
                  value={formData.companyName}
                   disabled/>
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="jobTitle">Job Title *</Label>
                <Input id="jobTitle"
                  placeholder="Enter job title"
                  value={formData.jobTitle}
                  onChange={handleInputChange}
                  required />
              </div>
            </div>
            <div className="space-y-2 mt-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                placeholder="Enter job description"
                value={formData.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="flex flex-wrap justify-between gap-2 md:flex-nowrap xs:flex-wrap mt-2">
              <div className="space-y-2 w-full">
                <Label htmlFor="salary">Salary *</Label>
                <Input
                  id="salary"
                  placeholder="Enter salary"
                  value={formData.salary}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="space-y-2 w-full">
                <Label htmlFor="location">Location (Optional)</Label>
                <Input
                  id="location"
                  placeholder="Enter job location"
                  value={formData.location}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="space-y-2 mt-2">
              <Label htmlFor="skills">Required Skills (Optional)</Label>
              <Textarea
                id="skills"
                placeholder="Enter required skills"
                value={formData.skills}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2 mt-2">
              <Label htmlFor="apply-link">Application Link (Optional)</Label>
              <Input
                id="applyLink"
                type="url"
                placeholder="Enter application URL"
                value={formData.applyLink}
                onChange={handleInputChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">Update Job Posting</Button>
          </CardFooter>
        </Card>
      </form>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Approval Required</DialogTitle>
            <DialogDescription>
              Your company&apos;s access status is pending. Please contact the admin for approval. You will be logged out from here.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={handleLogout} variant="destructive" className="w-full">Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default EditJob;

