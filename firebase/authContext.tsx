'use client'
import { createContext, useContext, useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './firebaseAuthConfig';

interface AuthContextType {
    userAuth: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    authLoading: boolean; 
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [userAuth, setUserAuth] = useState<User | null>(null);
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUserAuth(currentUser);
            setAuthLoading(false)
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const token = await userCredential.user.getIdToken();
    
            // Envie o token para seu backend para verificação
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Login error', error);
        }
    };

    const logout = async () => {
        await signOut(auth);
        setUserAuth(null);
    }

    return (
        <AuthContext.Provider value={{ userAuth, login, logout, authLoading }}>
            {  authLoading 
                ? 
                        <div className="w-full h-full min-h-screen flex flex-col justify-center items-center">
                            <p className='text-lg mb-4'>Loading</p>
                            <span className="loader"></span>
                        </div> 
                : 
                children
            }
        </AuthContext.Provider>
    )
};

// Hook personalizado para usar o AuthContext
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};