'use client';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import SignIn from "../../firebase/auth/signIn";
import { useState } from "react";
import Image from "next/image";
import Logo from '../../public/logo-clinica-saude.png';
import { FcGoogle } from "react-icons/fc";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SignInWithGoogle from "../../firebase/auth/signInWithGoogle";
import Link from "next/link";
import { useRouter } from "next/navigation";

 
const formSchema = z.object({
  email: z.string().email({ message: "Invalid email"}),
  password: z.string().min(6, {
    message: "Min 6 characters",
  }).max(30),
})
 
export default function Home() {

    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState(0);
    const [wasLoginButtonClicked, setWasLoginButtonClicked] = useState(false);
    const [loadUser, setLoadUser] = useState(false);


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    });

     
    async function onSubmit(values: z.infer<typeof formSchema>) {
        
        const { error } = await SignIn(values.email, values.password);

        setWasLoginButtonClicked(true);
        setErrorMessage(0);
        if(error) {
          if(error && typeof error === 'object' && 'code' in error && error.code === 'auth/invalid-credential') {
            setErrorMessage(1);
            setWasLoginButtonClicked(false);
          }
          else if(error && typeof error === 'object' && 'code' in error && error.code === 'auth/too-many-requests') {
            setErrorMessage(2);
            setWasLoginButtonClicked(false);
          }
        }
        else {
          setLoadUser(true);
        }
    }
    
    const handleLogInGoogle = async () => {
      setLoadUser(true);

      const { result, error } = await SignInWithGoogle();
      if (result) {
        setLoadUser(false);
        return router.push('/');
      } else {
        console.error('Error signing in with Google:', error);
        setLoadUser(false);
        return router.push('/');
      }
    }

 
    return (
      <main className="w-full h-full min-h-screen flex flex-col justify-center items-center bg-white">
          <Image 
            src={Logo} 
            alt="Logo"
            className='w-24 pb-5'
          />
          <div className="w-[22rem] shadow-lg rounded-xl px-7 py-10 relative">
              <Form {...form}>

                  <div className={`w-full h-[448px] rounded-xl bg-[#e2e0e06e] text-white ${loadUser ? 'flex' : 'hidden'} flex-col justify-center items-center absolute top-0 left-0 z-10 roundex-xl`}>
                      <p className="loader"></p>
                  </div>

                  <h1 className="font-medium text-xl pb-6">Olá, Bem-vindo de Volta.</h1>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-5"
                    >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input type="email" placeholder="email" {...field} className="py-5" disabled={wasLoginButtonClicked} />
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
                            <Input type="password" placeholder="password" {...field} className="py-5" disabled={wasLoginButtonClicked}/>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    { errorMessage === 1 && <p className="text-red-600">Email e/ou senha inválidos.</p> || errorMessage === 2 && <p className="text-red-600">Muitas tentativas, tente mais tarde.</p> }
                    <Button
                      className="w-full py-5"
                      type="submit"
                      >Sign in</Button>
                  </form>
                  <Button className="w-full flex gap-2 mt-4" variant="secondary" onClick={handleLogInGoogle}>
                      Google
                      <FcGoogle className="text-lg"/>
                  </Button>
                  <h2 className="text-sm pt-4 text-center">Não tem uma conta?
                    <Link href='/sign-up' className='font-semibold ml-1 underline'>Sign up</Link>
                  </h2>
              </Form>
          </div>
      </main>
    )
}