'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useUserStore from '@/features/user/userStore'
import { useAuth, useUser } from '@clerk/clerk-react'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { applyToJob } from '@/api/jobsApi'
import { sendEmail } from '@/api/emailApi'

const JobDescriptionTile = ({ activeJob }) => {
    const { user: UserData, fetchUser, addAppliedJob } = useUserStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [submittedTime, setSubmittedTime] = useState(null)
    const [isExternalApplyDialogOpen, setIsExternalApplyDialogOpen] = useState(false)

    const { getToken } = useAuth();
    const { user } = useUser();

    const handleApply = () => {
        // console.log(UserData);
        setIsDialogOpen(true)
    }

    const handleSubmitApplication = async () => {
        try {
            // console.log(activeJob._id)
            const res = await applyToJob(activeJob._id, user.id, await getToken());
            // console.log(res);
            setIsSubmitted(true)
            let date = new Date().toLocaleString();
            setSubmittedTime(date)
            // console.log(user.firstName,user.lastName);
            const emailRes = await sendEmail("jobApplicationConfirmation", user.emailAddresses[0].emailAddress, await getToken(), {fullName: user.firstName + " " +user.lastName, jobTitle: activeJob.jobTitle, companyName: activeJob.companyName});

            addAppliedJob({ jobId: activeJob._id, details: { "state": "applied", jobTitle: activeJob.jobTitle, companyName: activeJob.companyName, date: date} })
            // console.log(emailRes);
            toast({
                title: "Success",
                description: "Job application submitted successfully.",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Error",
                description: "Failed to apply for job. Please try again.",
            })
        }

        console.log("Updated", UserData);
        setIsDialogOpen(false)
        setIsExternalApplyDialogOpen(false);
    }

    const handleExternalApplyClick = async (e) => {
        e.preventDefault();
        setIsExternalApplyDialogOpen(true);
        // await handleSubmitApplication();
        // setIsExternalApplyDialogOpen(false);
    }

    useEffect(() => {
        if (!UserData || Object.keys(UserData).length === 0) {
            (async () => {
                const token = await getToken();
                fetchUser({ id: user.id, token })
            })()
        }
        // console.log(activeJob);
        // console.log(UserData?.appliedJob);
        if(UserData?.appliedJob?.find(job => job.jobId === activeJob._id)){
            setIsSubmitted(true)
        }else{
            setIsSubmitted(false);
        }
    }, [UserData, fetchUser, user, getToken,activeJob]);

    return (
        <>
            <Toaster />
            <h2 className="text-2xl font-semibold mb-4">{activeJob.jobTitle}</h2>
            <p className="text-lg font-medium text-gray-700">{activeJob.companyName}</p>
            <p className="text-sm text-gray-500 mb-4">{activeJob.location}</p>
            <p className="text-gray-800">{activeJob.description}</p>
            <Separator className="my-3" />
            <p>Salary {activeJob.salary}</p>
            <Separator className="my-3" />
            <div>
                <p>Required Skills:</p>
                <div className='flex flex-wrap gap-4 mt-2'>
                    {activeJob.skills}
                </div>
            </div>
            <Separator className="my-3" />
            <div className='flex flex-wrap justify-between items-center'>
            {isSubmitted ? (
                    <div className="flex items-center space-x-2">
                        <span className="text-green-500 font-semibold">Applied</span>
                    </div>
                ): 
                (activeJob.applyLink ? (
                    <>
                        <h4>Apply Link: <a className='hover:text-blue-300 underline' href={activeJob.applyLink} target='_blank' rel="noopener noreferrer" onClick={handleExternalApplyClick}>{activeJob.applyLink}</a></h4>
                        <Dialog open={isExternalApplyDialogOpen} onOpenChange={setIsExternalApplyDialogOpen}>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Did you apply to this job?</DialogTitle>
                                </DialogHeader>
                                <div className="flex justify-center space-x-4 mt-4">
                                    <Button onClick={handleSubmitApplication}>Yes</Button>
                                    <Button variant="outline" onClick={() => setIsExternalApplyDialogOpen(false)}>No</Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </>
                ) : (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant='outline' onClick={handleApply}>Apply</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Apply for {activeJob.jobTitle}</DialogTitle>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input id="name" className="col-span-3" value={user.fullName} disabled />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" type="email" className="col-span-3" value={user.emailAddresses[0].emailAddress} disabled />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="resume" className="text-right">
                                        Resume URL
                                    </Label>
                                    <Input id="resume" type="url" className="col-span-3" value={UserData?.resumeLink} disabled />
                                </div>
                            </div>
                            <Button onClick={handleSubmitApplication}>Apply to Job</Button>
                        </DialogContent>
                    </Dialog>
                ))}
            <p className='italic text-slate-500'>last updated: {activeJob.updatedAt}</p>
            </div>
        </>
    )
}

export default JobDescriptionTile
