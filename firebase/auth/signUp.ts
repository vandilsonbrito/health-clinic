import { auth } from "../firebaseAuthConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { firestore } from "../firebaseDBConfig";
import { collection, addDoc } from "firebase/firestore";

export default async function SignUp(name: string, email: string, password: string) {
    let result = null,
        error = null;
    try {
        result = await createUserWithEmailAndPassword(auth, email, password);

        const userCollectionRef = collection(firestore, 'users');

        await addDoc(userCollectionRef, {
            username: name,
            email: email
        })
        
    }
    catch(e) {
        error = e;
    }

    return { result, error };
}