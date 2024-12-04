import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@clerk/clerk-react";
import { getJobById } from "@/api/jobsApi";
import { getUser } from "@/api/userApi";
import { Button } from "@/components/ui/button";

const ApplicantList = ()=>{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const jobId = urlParams.get('id');

    const {getToken} = useAuth();

    const [loading, setLoading] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);

    useEffect(() => {
        const fetchApplicants = async () => {
            try {
                setLoading(true);
                const res = await getJobById(jobId, await getToken());
                const job = res.data.data;
                let apps = []
                for(let i=0;i<job.applicants.length;i++){
                    let cUser = await getUser(job.applicants[i], await getToken());
                    console.log("currentUser",cUser.data);
                    apps.push(cUser.data);
                }
                setSelectedJobId(job)
                setApplicants(apps);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching applicants:', error);
                setLoading(false);
            }
        };
        fetchApplicants();
    }, []);


    const handleRowClick = (index) =>{
        console.log(index);
    }
    return (
        <>
        <Card className="w-full max-w-4xl mx-auto mt-8">
            <Toaster/>
            <CardHeader>
                <CardTitle>Applicants for {selectedJobId?.jobName}</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
                    </div>
                ) : (
                    <Table>
                        <TableCaption>A list of all the applicants for this job posted by you.</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Applicant Email</TableHead>
                                <TableHead>Applicant Name</TableHead>
                                <TableHead >Resume</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicants.length > 0 ? (
                                applicants.map((applicant,index) => (
                                    <TableRow
                                        key={applicant._id}
                                        onClick={() => handleRowClick(index)}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <TableCell>{applicant?.emailAddress}</TableCell>
                                        <TableCell className="font-medium">{applicant?.firstName + " " + applicant?.lastName }</TableCell>
                                        <TableCell><Button onClick={()=>{
                                            //resume link if it exists
                                        }}variant="secondary">View Resume</Button></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">
                                        No applicants for this job.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
        </>
    )
}


export default ApplicantList;