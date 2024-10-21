import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";

  const formSchema = z.object({
    name: z.string().min(6, {
      message: "Min 6 characters",
    }).max(30),
    address: z.string().min(6, {
      message: "Min 6 characters",
    }).max(50),
    cellphone: z.string().min(11, { //checar se numero de telefone é valido
      message: "Min 11 characters",
    }).max(11),
    email: z.string().email({ message: "Invalid email"})
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
        
    console.log(values.name, values.cellphone, values.address, values.email);

    
}

export default function UpdateProfile() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            cellphone: "",
            address: "",
            email: ""
        },
    });

    return (
        <div className='w-full h-full'>
            <div className='w-full p-2 xl:p-5 mt-1 xl:mt-0 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
                <FaUserCircle className='text-2xl xl:text-4xl' />
                <h1>Atualizar Perfil</h1>
            </div>

            <div className="w-full h-full border mt-5 p-10 flex justify-center items-center">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full max-w-3xl flex flex-wrap space-y-5 p-6 rounded-lg shadow-2xl"
                        >
                            <div className="w-full grid grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                                    <FormItem>
                                        <FormLabel>Nome</FormLabel>
                                        <FormControl>
                                        <Input type="name" placeholder="nome" {...field} className="py-5"  />
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
                                        <Input type="email" placeholder="email" {...field} className="py-5" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                                    <FormItem>
                                        <FormLabel>Endereço</FormLabel>
                                        <FormControl>
                                        <Input type="address" placeholder="endereço" {...field} className="py-5" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="cellphone"
                                    render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                                    <FormItem>
                                        <FormLabel>Celular</FormLabel>
                                        <FormControl>
                                        <Input type="cellphone" placeholder="celular" {...field} className="py-5" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                    )}
                                />
                
                            </div>
                            <div className="w-full flex justify-center items-center mt-5">
                                <Button
                                    className="btn w-1/3 py-5 font-semibold bg-blueSecundary hover:bg-bluePrimary "
                                    type="submit"
                                >Salvar</Button>
                            </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}
