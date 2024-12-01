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
import { Loader2, MapPin, Mail, Users, CircleXIcon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Drawer } from 'vaul';
import { Toaster } from '@/components/ui/toaster';
import { useAuth, useUser } from '@clerk/clerk-react';
import { getJobsByCompany } from '@/api/jobsApi';

const JobsList = ()=>{
    const {getToken} = useAuth(); 
    const {user,isLoaded} = useUser();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedJobId, setSelectedJobId] = useState(null);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => {

        if(isLoaded && user){
            fetchJobs();
        }
    },[])
    const fetchJobs = async () => {
        try {
            let token = await getToken();
            const response = await getJobsByCompany(user.id,token);
            // const data = await response.json();
            setJobs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setLoading(false);
        }
    };
    return (
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
                                <TableHead className="text-right">Salary</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {jobs.length > 0 ? (
                                jobs.map((job) => (
                                    <TableRow
                                        key={job._id}
                                        onClick={() => handleRowClick(job._id)}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <TableCell className="font-medium">{job.companyName}</TableCell>
                                        <TableCell>{job.jobTitle}</TableCell>
                                        <TableCell className="text-right">{job.salary}</TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No companies available.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardContent>

            {/* <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right" dismissible={false}>
                <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content
                        className="right-2 top-2 bottom-2 fixed z-10 outline-none w-fit flex"
                        style={{ '--initial-transform': 'calc(100% + 100px)' }}
                    >
                        <div className="bg-zinc-50 h-full w-full grow p-5 flex flex-col rounded-[16px]">
                            <div className="max-w-md mx-auto">
                                <Drawer.Title className="float-end text-zinc-900">
                                    <CircleXIcon onClick={() => setIsDrawerOpen(false)} />
                                </Drawer.Title>
                                {selectedCompany && (
                                    <div className="px-4">
                                        <div className="flex items-center gap-4 mb-4">
                                            <Avatar className="w-16 h-16">
                                                <AvatarImage src={selectedCompany.profilePic} alt={selectedCompany.name} />
                                                <AvatarFallback>{selectedCompany.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h2 className="text-2xl font-bold">{selectedCompany.name}</h2>
                                                <p className="text-sm text-gray-500">ID: {selectedCompany._id}</p>
                                            </div>
                                        </div>
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-2">
                                                <MapPin className="w-5 h-5 text-gray-500" />
                                                <span>{selectedCompany.address}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-5 h-5 text-gray-500" />
                                                <a href={`mailto:${selectedCompany.email}`} className="text-blue-500 hover:underline">
                                                    {selectedCompany.email}
                                                </a>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Users className="w-5 h-5 text-gray-500" />
                                                <span>{1} user(s)</span>
                                            </div>
                                            <div>
                                                <h3 className="font-semibold mb-2">Access Status</h3>
                                                    <Badge variant={selectedCompany.accessStatus === 'PENDING' ? 'outline' : 'default'}>
                                                        {selectedCompany.accessStatus}
                                                    </Badge>
                                            </div>
                                        </div>
                                        <div className='flex gap-4 py-5'>
                                            <Button onClick={handleDeny} variant="destructive">Deny</Button>
                                            <Button onClick={handleApprove}>Approve</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root> */}
        </Card>
    )
}


export default JobsList;