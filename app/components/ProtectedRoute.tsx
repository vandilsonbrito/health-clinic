'use client'
import { useRouter } from 'next/navigation';
import { useAuth } from '../../firebase/authContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { userAuth, authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!authLoading && !userAuth) {
            router.push('/sign-in');
        }
    }, [userAuth, authLoading, router]);

    if(authLoading) return <div className="w-full min-h-screen flex flex-col justify-center items-center"><p>Loading...</p></div>

    return userAuth ? <>{children}</> : null;
};

export default ProtectedRoute;