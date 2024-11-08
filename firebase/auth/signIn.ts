import { auth } from "../firebaseAuthConfig";
import { signInWithEmailAndPassword } from "firebase/auth";

export default async function SignIn(email: string, password: string) {
    let userCredential = null,
        error = null;

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
        if (!response.ok) {
            throw new Error(`Login failed with status: ${response.status}`);
        }
    } 
    catch (e) {
        error = e;
        console.error('Login error', error);
    }
   
    return { userCredential, error };
}