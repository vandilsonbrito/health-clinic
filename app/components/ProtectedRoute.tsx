import { useRouter } from 'next/router';
import { useAuth } from '../../firebase/authContext';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    const { userAuth, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!loading && !userAuth) {
            router.push('/login');
        }
    }, [userAuth, loading, router]);

    if(loading) return <div className="w-full min-h-screen flex flex-col justify-center items-center"><p>Loading...</p></div>

    return userAuth ? <>{children}</> : null;
};

export default ProtectedRoute;