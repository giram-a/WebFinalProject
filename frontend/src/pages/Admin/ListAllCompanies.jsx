import { useEffect ,useState} from 'react';
import { useNavigate } from 'react-router-dom';
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
import { Loader2 } from 'lucide-react';
import { getAllCompanies } from '@/api/companyApi';

const ListAllCompanies = () => {
    const navigate = useNavigate();
    const [companies,setCompanies] = useState([]);
    useEffect( () => {
        const fetchData = async () => {
            const response = await getAllCompanies();
            // const data = response.json();
            console.log(response);
            setCompanies(response.data);
        }
        fetchData();
    }, []);

    const status = "SUCCESS"; // Replace this with your actual status

    const handleRowClick = (companyId) => {
        navigate(`/company/${companyId}`);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto mt-8">
            <CardHeader>
                <CardTitle>Companies List</CardTitle>
            </CardHeader>
            <CardContent>
                {status === "PENDING" ? (
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
        </Card>
    );
};

export default ListAllCompanies;

