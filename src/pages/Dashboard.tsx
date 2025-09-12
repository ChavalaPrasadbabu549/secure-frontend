import Navbar from '@/components/Navbar'
import instance from '@/utils/api';
import { Loader2Icon } from 'lucide-react';
import { useEffect, useState } from 'react'
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { jwtDecode } from "jwt-decode";
import CommonDialog from '@/components/CommonDialog';
import Updateuser from '@/components/Updateuser';

interface User {
    id: string,
    name: string,
    email: string,
    password: string,
}
interface DecodedToken {
    id: string;
}

const Dashboard = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const token = localStorage.getItem("token");
    const decoded: DecodedToken | null = token ? jwtDecode(token) : null;
    const userId = decoded?.id;

    const fetchUser = async () => {
        if (!userId) return;
        try {
            setLoading(true);
            const response = await instance.get(`/user/${userId}`);
            setUser(response?.data?.data);
        } catch (error) {
            console.log("Error fetching user by ID", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUser();
    }, [userId]);

    return (
        <div className="pl-4 pr-4 pt-14">
            <Navbar name={user?.name} />
            {loading ? (
                <div className="flex justify-center items-center">
                    <Loader2Icon className="animate-spin w-6 h-6" />
                </div>
            ) : (
                user && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 pt-3">
                        <Card
                            className="cursor-pointer hover:shadow-lg transition"
                            onClick={() => setIsDialogOpen(true)}
                        >
                            <CardHeader>
                                <CardTitle>{user?.name}</CardTitle>
                                <CardDescription>{user?.email}</CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                )
            )}
            <CommonDialog
                title="Update User Details"
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            >
                {user && (
                    <Updateuser
                        user={{
                            id: user.id,
                            name: user.name,
                            email: user.email,
                            password: user.password,
                        }}
                        onSuccess={fetchUser}
                        onClose={() => setIsDialogOpen(false)}

                    />
                )}
            </CommonDialog>
        </div>
    )
}

export default Dashboard
