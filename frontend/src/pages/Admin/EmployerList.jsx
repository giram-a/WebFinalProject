import { cn } from '@/lib/utils';

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
import { Loader2, MapPin, Mail, Users } from 'lucide-react';
import { getAllCompanies, getCompanyById } from '@/api/companyApi';
import { useAuth } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";

const EmployerList = () => {
    const { getToken } = useAuth();
    const [companies, setCompanies] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let token = await getToken();
                const response = await getAllCompanies(token);
                setCompanies(response.data);
            } catch (error) {
                console.error("Failed to fetch companies:", error);
                toast({
                    title: "Error",
                    description: "Failed to load companies. Please try again.",
                    variant: "destructive",
                });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [getToken]);

    const handleRowClick = async (companyId) => {
        try {
            const response = await getCompanyById(companyId,await getToken());
            // console.log(response.data);
            setSelectedCompany(response.data[0]);
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

    const handleApprove = async () => {
        try {
            const response = await updateCompany(selectedCompany._id, "APPROVED");
            if (!response.status) {
                throw new Error("Failed to approve company");
            }
            toast({
                title: "Success",
                description: "Company has been approved.",
            });
            setIsDrawerOpen(false);
            // Refresh the companies list
            const updatedCompanies = await getAllCompanies(await getToken());
            setCompanies(updatedCompanies.data);
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
            const response = await updateCompany(selectedCompany._id, "REJECTED");
            if (!response.status) {
                throw new Error("Failed to deny company");
            }
            toast({
                title: "Success",
                description: "Company has been denied.",
            });
            setIsDrawerOpen(false);
            // Refresh the companies list
            const updatedCompanies = await getAllCompanies(await getToken());
            setCompanies(updatedCompanies.data);
        } catch (error) {
            console.error("Failed to deny company:", error);
            toast({
                title: "Error",
                description: "Failed to deny company. Please try again.",
                variant: "destructive",
            });
        }
    };

    return (
        
        <Card className="w-full max-w-4xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Companies List</CardTitle>
            </CardHeader>
            <CardContent>
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <Loader2 className="animate-spin text-gray-500 w-8 h-8" />
                    </div>
                ) : (
                    <Table>
                        <TableCaption>A list of all the Companies</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Company Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-right">Access Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {companies.length > 0 ? (
                                companies.map((company) => (
                                    <TableRow 
                                        key={company._id} 
                                        onClick={() => handleRowClick(company._id)}
                                        className="cursor-pointer hover:bg-gray-100"
                                    >
                                        <TableCell className="font-medium">{company.name}</TableCell>
                                        <TableCell>{company.email}</TableCell>
                                        <TableCell className="text-right">{company.accessStatus}</TableCell>
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

            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right">
                <DrawerContent>
                    <DrawerHeader className="text-left">
                        <DrawerTitle>Company Details</DrawerTitle>
                        <DrawerDescription>View and manage company information</DrawerDescription>
                    </DrawerHeader>
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
                                    {/* <span>{selectedCompany.users.length} user(s)</span> */}
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Access Status</h3>
                                    {Array.isArray(selectedCompany.accessStatus) ? (
                                        selectedCompany.accessStatus.map((status, index) => (
                                            <Badge key={index} variant={status === 'PENDING' ? 'outline' : 'default'} className="mr-2">
                                                {status}
                                            </Badge>
                                        ))
                                    ) : (
                                        <Badge variant={selectedCompany.accessStatus === 'PENDING' ? 'outline' : 'default'}>
                                            {selectedCompany.accessStatus}
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                    <DrawerFooter className="flex justify-end space-x-4">
                        <DrawerClose asChild>
                            <Button variant="outline">Close</Button>
                        </DrawerClose>
                        <Button onClick={handleDeny} variant="destructive">Deny</Button>
                        <Button onClick={handleApprove}>Approve</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Card>
    );
};

export default EmployerList;

