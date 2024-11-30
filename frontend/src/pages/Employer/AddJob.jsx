import { useState,useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from '@/hooks/use-toast.js'
import { Toaster } from '@/components/ui/toaster'
import { createJob } from '@/api/jobsApi'
import { useAuth, useUser } from '@clerk/clerk-react'
import { findCompany } from '@/api/companyApi'

const AddJob = () => {
  const { getToken } = useAuth();
  const { user,isLoaded } = useUser();

  
    useEffect(() => {
      if (isLoaded && user) {
        fetchDataForCompany();
      }
    }, [isLoaded, user]);
    
    const fetchDataForCompany = async () => {
      try {
      console.log(user)
      let token = await getToken();
      const res = await findCompany(user.id, token);
      // console.log(res.data)
      if (res.data.accessStatus === "PENDING") {
        alert("approval needed")
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
    const res = await createJob(formData, token)
    console.log("job creation res", res);
    if(res.status){
      toast({
        description: res.data.message,
      })
      setFormData(initialFormState);
    }else{
      toast({
        description: "Something went wrong",
      })
    }
  };

  return (
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
                onChange={handleInputChange} required />
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
          <Button type="submit" className="w-full">Submit Job Posting</Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default AddJob
