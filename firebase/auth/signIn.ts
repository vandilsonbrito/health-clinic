import { auth } from "../firebaseAuthConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function SignIn(email: string, password: string) {
    let userCredential = null,
        error = null;
    try {
        try {
            userCredential = await signInWithEmailAndPassword(auth, email, password);
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
    }
    catch(Error) {
        error = Error;
    }

    return { userCredential, error };
}