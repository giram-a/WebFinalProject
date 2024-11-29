import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from 'lucide-react';
import { getCompanyById } from '@/api/companyApi';

const CompanyDetails = () => {
    const { id } = useParams();
    const [company, setCompany] = useState(
        {} 
    );
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCompanyDetails = async () => {
            try {
                const response = await getCompanyById(id);
                // const data = await response.json();
                setCompany(response.data);
            } catch (error) {
                console.error("Failed to fetch company details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCompanyDetails();
    }, [id]);

    const handleApprove = async () => {
        // Implement approve logic here
        console.log("Approve company:", id);
    };

    const handleDeny = async () => {
        // Implement deny logic here
        console.log("Deny company:", id);
    };

    if (loading) {
        return (
            <div className="flex h-screen justify-center items-center">
                <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
            </div>
        );
    }

    if (!company) {
        return <div>Company not found</div>;
    }

    return (
        <Card className="w-full max-w-2xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>{company.fullName}</CardTitle>
            </CardHeader>
            <CardContent>
                <p><strong>Email:</strong> {company.email}</p>
                <p><strong>Access Status:</strong> {company.accessStatus}</p>
                {/* Add more company details here */}
            </CardContent>
            <CardFooter className="flex justify-end space-x-4">
                <Button onClick={handleDeny} variant="destructive">Deny</Button>
                <Button onClick={handleApprove}>Approve</Button>
            </CardFooter>
        </Card>
    );
};

export default CompanyDetails;

