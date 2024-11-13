'use client';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import SignUp from "../../firebase/auth/signUp";
import Image from "next/image";
import Logo from '../../public/logo-clinica-saude.png';
import { database } from "../../firebase/firebaseDBConfig";
import { ref, set } from "firebase/database";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import SignInWithGoogle from "../../firebase/auth/signInWithGoogle";
import { useRouter } from "next/navigation";
import useGlobalStore from "@/utils/globalStorage";

 
const formSchema = z.object({
    name: z.string().min(6, {
        message: "Min 6 characters",
      }).max(30),
    email: z.string().email({ message: "Email inválido"}),
    password: z.string().min(6, {
        message: "Min 6 characters",
      }).max(30),
})
 
export default function UserSignUp() {
    
    const { setCameFromSignUp } = useGlobalStore();
    const [errorMessage, setErrorMessage] = useState('');
    const [loadUser, setLoadUser] = useState(false);

    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });
     

    async function onSubmit(values: z.infer<typeof formSchema>) {
    
        setLoadUser(true);
        setErrorMessage('');
        const { result, error } = await SignUp(values.email, values.password);

        if(error) {
            if(error && typeof error === 'object' && 'code' in error && error.code === 'auth/email-already-in-use'){
                setErrorMessage("Email já cadastrado.");
                setLoadUser(false);
            }
            return console.log(error);
        }

        if(result && result.user) {
            const userRef = ref(database, 'users/' + result.user.uid + '/profile');
            await set(userRef, {
                name: values.name,
                email: result.user.email
            });

            setLoadUser(false);
            setCameFromSignUp(true);
            return router.push('/agendamento');
        }

    }
    
    const handleLogInGoogle = async () => {
        setLoadUser(true);

        const { result, error } = await SignInWithGoogle();
        if (result) {
            const userRef = ref(database, 'users/' + result.user.uid + '/profile');
            await set(userRef, {
                username: result.user.displayName,
                email: result.user.email
            });

            setLoadUser(false);
            setCameFromSignUp(true);
            return router.push('/agendamento');
        } else {
            console.error('Error signing in with Google:', error);
            setLoadUser(false);
            return router.push('/');
        }
    }
 
    return (
        <main className="w-full h-full min-h-screen flex flex-col justify-center items-center bg-white">
            <Link href="/">
                <Image
                src={Logo}
                alt="Logo"
                className='w-24 pb-5'
                />
            </Link>
            <div className="w-[22rem] shadow-lg rounded-xl px-7 py-10 bg-white relative">
                <Form {...form}>

                    <div className={`w-full h-[535px] rounded-xl bg-[#e2e0e06e] text-white ${loadUser ? 'flex' : 'hidden'} flex-col justify-center items-center absolute top-0 left-0 z-10 roundex-xl`}>
                        <p className="loader"></p>
                    </div>

                    <h1 className="font-medium text-xl pb-6 text-center">Cadastre-se</h1>
                    <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                            <FormItem>
                                <FormLabel>Nome</FormLabel>
                                <FormControl>
                                <Input type="text" placeholder="name" {...field} className="py-5" disabled={loadUser}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                <Input type="email" placeholder="email" {...field} className="py-5" disabled={loadUser}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                            <FormItem>
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                <Input type="password" placeholder="password" {...field} className="py-5" disabled={loadUser}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        { errorMessage && <p className="text-red-600 tex-center">{errorMessage}</p> }

                        <Button
                            className="w-full py-5"
                            type="submit"
                            >Sign up</Button>
                    </form>
                    <Button className="w-full flex gap-2 mt-4" variant="secondary" onClick={handleLogInGoogle}>
                        Google
                        <FcGoogle className="text-lg"/>
                    </Button>
                    
                    <h2 className="text-sm pt-4 text-center">Já possui cadastro?
                    <Link href='/' className='font-semibold ml-1 underline'>Log in</Link>
                    </h2>
                </Form>
            </div>
      </main>
    )
}