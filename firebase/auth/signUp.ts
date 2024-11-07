import { auth } from "../firebaseAuthConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default async function SignUp(email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);
    }
    catch(e) {
        error = e;
    }

    return { result, error };
}