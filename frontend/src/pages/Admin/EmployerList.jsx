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
import { getAllCompanies, getCompanyById, updateCompany } from '@/api/companyApi';
import { useAuth } from '@clerk/clerk-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Drawer } from 'vaul';
import { Toaster } from '@/components/ui/toaster';
import { sendEmail } from '@/api/emailApi';

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
            const response = await getCompanyById(companyId, await getToken());
            // console.log(response.data)
            setSelectedCompany(response.data);
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
            const response = await updateCompany(selectedCompany._id, "APPROVED", await getToken());
            if (!response.status) {
                throw new Error("Failed to approve company");
            }
            toast({
                title: "Success",
                description: "Company has been approved.",
            });
            const emailRes = await sendEmail("companyApproval",selectedCompany.email, await getToken(),{companyName: selectedCompany.companyName});
            setIsDrawerOpen(false);
            const updatedCompanies = await getAllCompanies(await getToken());
            // console.log(updatedCompanies);
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
            const response = await updateCompany(selectedCompany._id, "REJECTED", await getToken());
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
            // console.log(updatedCompanies);
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
    const handleBlockCompany =async ()=>{
        try {
            const response = await updateCompany(selectedCompany._id, "BLOCKED", await getToken());
            if (!response.status) {
                throw new Error("Failed to block company");
            }
            toast({
                title: "Success",
                description: "Company has been blocked.",
            });
            setIsDrawerOpen(false);
            // Refresh the companies list
            const updatedCompanies = await getAllCompanies(await getToken());
            // console.log(updatedCompanies);
            setCompanies(updatedCompanies.data);
        } catch (error) {
            console.error("Failed to deny company:", error);
            toast({
                title: "Error",
                description: "Failed to deny company. Please try again.",
                variant: "destructive",
            });
        }
    }

    return (

        <Card className="w-full max-w-4xl mx-auto mt-8">
            <Toaster/>
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

            <Drawer.Root open={isDrawerOpen} onOpenChange={setIsDrawerOpen} direction="right" dismissible={false}>
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
            {selectedCompany.accessStatus === 'PENDING' ? (
              <>
                <Button onClick={handleDeny} variant="destructive">Deny</Button>
                <Button onClick={handleApprove}>Approve</Button>
              </>
            ) : (
              <Button onClick={handleBlockCompany} variant="destructive">Block Company</Button>
            )}
          </div>
                                    </div>
                                )}
                            </div>
                        </div>

                    </Drawer.Content>
                </Drawer.Portal>
            </Drawer.Root>
        </Card>
    );
};

export default EmployerList;
