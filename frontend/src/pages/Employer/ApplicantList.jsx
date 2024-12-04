import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { Table,TableBody,TableCaption,TableCell,TableHead,TableHeader,TableRow } from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/toaster";

const ApplicantList = ()=>{
    const [loading, setLoading] = useState(false);
    const [applicants, setApplicants] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState(null);


    const handleRowClick = (index) =>{
        console.log(index);
    }

    // useEffect(() => {
    //     const fetchApplicants = async () => {
    //         try {
    //             setLoading(true);
    //             const response = await fetch('/api/jobs/applicants', {
    //                 method: 'GET',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //             });
    //             const data = await response.json();
    //             setApplicants(data);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Error fetching applicants:', error);
    //             setLoading(false);
    //         }
    //     };
    //     fetchApplicants();
    // }, []);

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
                                <TableHead>Job Name</TableHead>
                                <TableHead>Applicant Name</TableHead>
                                <TableHead >Resume</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applicants.length > 0 ? (
                                applicants.map((job,index) => (
                                    <TableRow
                                        key={job._id}
                                        onClick={() => handleRowClick(index)}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <TableCell className="font-medium">{job.companyName}</TableCell>
                                        <TableCell>{job.jobTitle}</TableCell>
                                        <TableCell>{job.salary}</TableCell>
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