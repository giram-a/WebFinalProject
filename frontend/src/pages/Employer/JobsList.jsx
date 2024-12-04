import { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, MapPin, Users, CircleXIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Drawer } from 'vaul';
import { Toaster } from '@/components/ui/toaster';
import { useAuth, useClerk, useUser } from '@clerk/clerk-react';
import { getJobsByCompany,updateJobVisibility } from '@/api/jobsApi';
import { useNavigate } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
import { findCompany } from '@/api/companyApi';

const JobsList = ()=>{
    const {getToken} = useAuth(); 
    const {user,isLoaded} = useUser();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isDialogOpen,setIsDialogOpen] = useState(false);
    const navigate = useNavigate();
    const { signOut } = useClerk();
    useEffect(() => {
        

        if(isLoaded && user){
            fetchJobs();
        }
    },[])
    const fetchJobs = async () => {
        try {
            let token = await getToken();
            const response = await getJobsByCompany(user.id,token);
            const company = await findCompany(user.id,token);
            if(company.data.accessStatus === "PENDING"){
                setIsDialogOpen(true);
            }
            setJobs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setLoading(false);
        }
    };
    const handleRowClick = async (jobId) => {
        try {
            setSelectedJobId(jobs[jobId]);
            setIsDrawerOpen(true);
        } catch (error) {
            console.error("Failed to fetch company details:", error);
            toast({
                title: "Error",
                description: "Failed to load company details. Please try again.",
                variant: "destructive",
            });
        }
    };
    const handleJobUpdate =async (status)=>{
        try{
        const response = await updateJobVisibility(selectedJobId._id,status, await getToken());
        if (!response.status) {
            throw new Error("Failed to hide job");
        }
        setIsDrawerOpen(false);
        // Refresh the companies list
        const updatedCompanies = await getJobsByCompany(user.id,await getToken());
        console.log(updatedCompanies);
        setJobs(updatedCompanies.data);
    } catch (error) {
        console.error("Failed to hide job:", error);
        toast({
            title: "Error",
            description: "Failed to deny company. Please try again.",
            variant: "destructive",
        });
    }
    };
    const handleEdit = ()=>{
        navigate(`/employer/editjob?id=${selectedJobId._id}`);
    }
    const handleLogout =async ()=>{
        await signOut();
    }
    return (
        <>
        <Card className="w-full max-w-4xl mx-auto mt-8">
            <Toaster/>
            <CardHeader>
                <CardTitle>Jobs List</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
                    </div>
                ) : (
                    <Table>
                        <TableCaption>A list of all the jobs posted by you.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company Name</TableHead>
                                <TableHead>Job Title</TableHead>
                                <TableHead >Salary</TableHead>
                                <TableHead className="text-right">Publish status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.length > 0 ? (
                                jobs.map((job,index) => (
                                    <TableRow
                                        key={job._id}
                                        onClick={() => handleRowClick(index)}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <TableCell className="font-medium">{job.companyName}</TableCell>
                                        <TableCell>{job.jobTitle}</TableCell>
                                        <TableCell>{job.salary}</TableCell>
                                        <TableCell className={`text-right ${job.publishStatus === 'PUBLISHED' ? 'text-green-500' : 'text-red-500'}`} >{job.publishStatus}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No jobs available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardContent>

             <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right" dismissible={false}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40"  />
                    <Drawer.Content
                        className="right-2 top-2 bottom-2 fixed z-10 outline-none w-fit flex"
                        style={{ '--initial-transform': 'calc(100% + 100px)' }}
                    >
                        <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
                            <div className="max-w-md mx-auto h-screen overflow-y-auto">
                                <Drawer.Title className="float-end text-zinc-900">
                                    <CircleXIcon onClick={() => setIsDrawerOpen(false)} />
                                </Drawer.Title>
                                {selectedJobId && (
                                    <div className="px-4">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="w-16 h-16">
                                                <AvatarImage src={selectedJobId.companyName} alt={selectedJobId.companyName} />
                                                <AvatarFallback>{selectedJobId.companyName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h2 className="text-2xl font-bold">{selectedJobId.companyName}</h2>
                                                <p className="text-sm text-gray-500">ID: {selectedJobId._id}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-gray-500" />
                                                <span>{selectedJobId.jobTitle}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-5 h-5 text-gray-500" />
                                                <span>{selectedJobId.description}</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">Total applicants:</h3>
                                                    <Badge onClick={()=>navigate(`/employer/applicants?id=${selectedJobId._id}`)} variant={selectedJobId.accessStatus === 'PENDING' ? 'outline' : 'default'}>
                                                        {selectedJobId?.applicants?.length || "0" }
                                                    </Badge>
                                            </div>
                                        </div>
                                        <div className='flex gap-4 py-5'>
                                            {selectedJobId.publishStatus==="PUBLISHED" ? <Button onClick={()=> {handleJobUpdate("HIDDEN")}} variant="destructive">Hide</Button>:
                                            <Button onClick={()=>{handleJobUpdate("PUBLISHED")}}>Publish</Button>}
                                            {selectedJobId.publishStatus==="HIDDEN" &&<Button onClick={handleEdit}>Edit</Button>}  
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </Card>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent onInteractOutside={(e)=>e.preventDefault()}>
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


export default JobsList;