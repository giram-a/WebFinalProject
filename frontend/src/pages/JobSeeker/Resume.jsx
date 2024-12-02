import { getPresignedUrlForResumeUpload, uploadResumeToS3 } from '@/api/userApi';
import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useState } from 'react'
import { useMediaQuery } from "react-responsive";
import ResumeViewer from './ResumeViewer';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/toaster';
import { toast } from "@/hooks/use-toast";
import { Loader2 } from 'lucide-react';

const Resume = () => {

    const isMobile = useMediaQuery({ maxWidth: 640 });
    const publicFileUrl = "https://future-hire.s3.us-east-1.amazonaws.com/user_2pYJ8j01mD2J1YwqvWls8RoadHd/CRD.pdf";

    const [file, setFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState(false);

    const { getToken, isLoaded } = useAuth()
    const { user, isLoaded: isUserLoaded } = useUser()

    if (!isLoaded && !isUserLoaded) {
        return "Loading ...."
    }

    const handleFileChange = (event) => {
        setFile(() => event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            toast({
                title: "Error",
                description: "Please select the file",
                variant: "destructive",
            });
            return;
        }

        try {
            setUploadStatus(true);
            const token = await getToken();
            const response = await getPresignedUrlForResumeUpload(file.name, user.id, file.type, token);
            const { presigned } = response.data;

            const res = await uploadResumeToS3(presigned, file)

            if (res.status) {
                setUploadStatus(false);
                toast({
                    title: "Success",
                    description: "Resume Uploaded Successfully",
                    variant: "destructive",
                });
            } else {
                setUploadStatus(false);
                toast({
                    title: "Error",
                    description: "Resume Upload Failed",
                    variant: "destructive",
                });
            }

        } catch (error) {
            console.error("Error uploading file:", error);
            setUploadStatus(false);
        }
    };

    return (
        <div className="flex flex-wrap gap-4 justify-center md:justify-between">
            <div className="w-full xs:w-[100%] md:w-[45%] p-4">
                <div className="w-fit mx-auto md:mt-56 px-6 py-3 bg-white rounded-lg shadow-lg border-slate-200 border">
                    <div className="grid w-full max-w-sm items-center gap-1.5 mt-2">
                        <Label htmlFor="resume">Upload New Resume</Label>
                        <Input id="resume" type="file" onChange={handleFileChange} />
                    </div>

                    <Button
                        onClick={handleUpload}
                        variant="secondary"
                        className="w-full mt-2"
                    >
                        {uploadStatus ? (<div className="flex justify-center items-center h-64">
                            <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
                        </div>) : "Upload"}
                    </Button>
                </div>
            </div>

            <div className="w-full xs:w-[100%] md:w-fit p-4 flex justify-center items-center shadow-md border-slate-200 border-2 rounded-lg m-3 hover:shadow-2xl">
                <ResumeViewer publicUrl={publicFileUrl} maxWidth={isMobile ? 350 : 650} />
            </div>

            <Toaster />
        </div>
    )
}

export default Resume
