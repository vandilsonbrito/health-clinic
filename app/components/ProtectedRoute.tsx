'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/authContext';
import { useEffect } from 'react';
import { useDataFromDB } from '@/firebase/databaseCRUDFunctions';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { userAuth, authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!authLoading && !userAuth) {
            router.push('/sign-in');
        }
    }, [userAuth, authLoading, router]);

    const { data: userProfileDataFromDB } = useDataFromDB({ 
        route: 'users/' + userAuth?.uid + '/profile', 
        queryKey: 'user-profile-data' 
    });


    if(authLoading || !userProfileDataFromDB) return <div className="w-full min-h-screen flex flex-col justify-center items-center"><p className="text-lg">Carregando...</p></div>

    return (userAuth && userProfileDataFromDB) ? <>{children}</> : null;
};

export default ProtectedRoute;