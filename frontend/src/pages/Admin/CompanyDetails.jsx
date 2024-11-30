import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, MapPin, Mail, Users } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import { getCompanyById,updateCompany } from '@/api/companyApi';

const CompanyDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const response = await getCompanyById(id);
                setCompany(response.data);
            } catch (error) {
                console.error("Failed to fetch company details:", error);
                toast({
                    title: "Error",
                    description: "Failed to load company details. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [id]);

    const handleApprove = async () => {
        try {
            // Replace this with your actual API call
            // const response = await fetch(`/api/companies/${id}/approve`, { method: 'POST' });
            const response = await updateCompany(id,"APPROVED");
            if(!response.status){
                toast({
                    title: "Error",
                    description: "Failed to approve company. Please try again.",
                    variant: "destructive",
                });
                return
            }
            toast({
                title: "Success",
                description: "Company has been approved.",
            });
            navigate('/admin');
        } catch (error) {
            console.error("Failed to approve company:", error);
            toast({
                title: "Error",
                description: "Failed to approve company. Please try again.",
                variant: "destructive",
            });
        }
    };

    const handleDeny = async () => {
        try {
            // Replace this with your actual API call
            const response = await updateCompany(id,"REJECTED");
            toast({
                title: "Success",
                description: "Company has been denied.",
            });
            // Navigate back to list
            navigate('/admin');
        } catch (error) {
            console.error("Failed to deny company:", error);
            toast({
                title: "Error",
                description: "Failed to deny company. Please try again.",
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
            </div>
        );
    }

    if (!company) {
        return (
            <Card className="w-full max-w-2xl mx-auto mt-8">
                <CardContent className="pt-6">
                    <p className="text-center text-gray-500">Company not found</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-8">
            <CardHeader className="flex flex-row items-center gap-4">
                <Avatar className="w-16 h-16">
                    <AvatarImage src={company.profilePic} alt={company.name} />
                    <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-2xl">{company.name}</CardTitle>
                    <p className="text-sm text-gray-500">ID: {company._id}</p>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-500" />
                    <span>{company.address}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <a href={`mailto:${company.email}`} className="text-blue-500 hover:underline">
                        {company.email}
                    </a>
                </div>
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-500" />
                    <span>{company.users.length} user(s)</span>
                </div>
                <div>
                    <h3 className="font-semibold mb-2">Access Status</h3>
                    {company.accessStatus.map((status, index) => (
                        <Badge key={index} variant={status === 'PENDING' ? 'outline' : 'default'} className="mr-2">
                            {status}
                        </Badge>
                    ))}
                </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
                <Button onClick={() => navigate('/admin')} variant="outline">Back to List</Button>
                <Button onClick={handleDeny} variant="destructive">Deny</Button>
                <Button onClick={handleApprove}>Approve</Button>
            </CardFooter>
        </Card>
    );
};

export default CompanyDetails;

