import { useState,useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useUserStore from '@/features/user/userStore';
import { useAuth,useUser} from '@clerk/clerk-react'
import { toast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'
import { applyToJob } from '@/api/jobsApi'

const JobDescriptionTile = ({activeJob}) => {
    const { user: UserData, fetchUser } = useUserStore();
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const {getToken} = useAuth();
    const {user} = useUser();

    const handleApply = () => {
        console.log(UserData);
        setIsDialogOpen(true)
    }

    const handleSubmitApplication = async () => {
        try{
            const res = await applyToJob(activeJob.id, user.id, await getToken());
            console.log(res);
            toast({
                variant: "destructive",
                title: "Error",
                description: "Job applied.",
             })
        }catch(error){
         toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to apply for job. Please try again.",
         })
        }
        setIsDialogOpen(false)
    }

    useEffect(() => {
        if (!UserData || Object.keys(UserData).length === 0) {
            (async () => {
                const token = await getToken();
                fetchUser({ id: user.id, token })
            })()
        }
    }, [UserData, fetchUser, user]);

    return (
        <>
        <Toaster/>
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
            <div className='flex flex-wrap justify-between'>
                {activeJob.applyLink ? (
                    <h4>Apply Link: <a className='hover:text-blue-300 underline' href={activeJob.applyLink} target='_blank' rel="noopener noreferrer">{activeJob.applyLink}</a></h4>
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
                                    <Input id="name" className="col-span-3" value={user.fullName} disabled/>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="email" className="text-right">
                                        Email
                                    </Label>
                                    <Input id="email" type="email" className="col-span-3"  value={user.emailAddresses[0].emailAddress} disabled/>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="resume" className="text-right">
                                        Resume URL
                                    </Label>
                                    <Input id="resume" type="url" className="col-span-3" value={UserData.resumeLink} disabled/>
                                </div>
                            </div>
                            <Button onClick={handleSubmitApplication}>Apply to Job</Button>
                        </DialogContent>
                    </Dialog>
                )}
                <p className='italic text-slate-500'>last updated: {activeJob.updatedAt}</p>
            </div>
        </>
    )
}

export default JobDescriptionTile

