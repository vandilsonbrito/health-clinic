
'use client';
import React, { useEffect, useState } from 'react';
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { useAuth } from '@/firebase/authContext';
import { withMask   } from 'use-mask-input';
import { updateDBData, useDataFromDB } from '@/firebase/databaseCRUDFunctions';
import useGlobalStore from '@/utils/globalStorage';
import toast, { Toaster } from 'react-hot-toast';

const formSchema = z.object({
    name: z.string().min(6, {
      message: "Min 6 caracteres",
    }).max(30),
    email: z.string().email(
        { message: "email inválido"}
    ),
    cpf: z.string()/* .min(11, { message: "CPF precisa ter 11 dígitos"}).max(11,  {message: "CPF precisa ter 11 dígitos" }) */,
    street: z.string().min(6, {
      message: "Min 6 caracteres",
    }).max(50),
    neighborhood: z.string().min(6, {
      message: "Min 5 caracteres",
    }).max(50),
    cityState: z.string().min(6, {
      message: "Min 10 caracteres",
    }).max(50),
    cellphone: z.string()/* .min(11, { message: "Um número válido precisa ter 11 dígitos"}).max(11,  {message: "Um número válido precisa ter 11 dígitos" }), */
});



export default function ProfileForm() {
    

    const { userAuth } = useAuth();
    const { setHasTheProfileBeenUpdated } = useGlobalStore();
    const [saveButtonSate, setSaveButtonState] = useState<'initial' | 'loading' | 'completed' | 'error'>('initial');
    const { data: UserProfileData } = useDataFromDB({ route: 'users/' + userAuth?.uid + '/profile' })

    async function onSubmit(values: z.infer<typeof formSchema>) {  
        setHasTheProfileBeenUpdated(false);

        const userData = {
            name: values.name,
            email: values.email,
            cpf: values.cpf,
            street: values.street,
            neighborhood: values.neighborhood,
            cityState: values.cityState,
            cellphone: values.cellphone,
        } 
        setSaveButtonState('loading');
        const itWasUpdated = await updateDBData({ 
            route: 'users/' + userAuth?.uid + '/profile', 
            data: userData
        });
        if(itWasUpdated === 'Successfully updated') {
            setSaveButtonState('completed');
            setHasTheProfileBeenUpdated(true);
        }
        else {
            setSaveButtonState('error');
            toast('Preeencha todos os campos!', { style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }, });
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: userAuth?.displayName || "",
            email: userAuth?.email || "",
            cpf: UserProfileData?.cpf || "",
            street: UserProfileData?.street || "",
            neighborhood: UserProfileData?.neighborhood || "",
            cityState: UserProfileData?.cityState || "",
            cellphone: UserProfileData?.cellphone || "",
        },
    });

    useEffect(() => {
        if(!UserProfileData) return;

        form.reset({
            name: userAuth?.displayName || UserProfileData?.name || "",
            email: userAuth?.email || "",
            cpf: UserProfileData?.cpf || "",
            street: UserProfileData?.street || "",
            neighborhood: UserProfileData?.neighborhood || "",
            cityState: UserProfileData?.cityState || "",
            cellphone: UserProfileData?.cellphone || "",
        });
    }, [UserProfileData, form, userAuth]);

    useEffect(() => {
        if(saveButtonSate === 'completed'){
            const returnSate = setTimeout(() => {
                setSaveButtonState('initial');
            }, 2000);
            
            return () => clearTimeout(returnSate);
        }
    }, [saveButtonSate])

    return (
        <>  
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="w-full max-w-5xl flex flex-wrap space-y-5 p-6 rounded-lg shadow-2xl"
                    >
                        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                    <Input type="name" placeholder={userAuth?.displayName || "nome"} {...field} value={userAuth?.displayName || UserProfileData?.name || ""} disabled/>
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
                                    <Input type="email" placeholder="email" {...field} 
                                    value={userAuth?.email || ''} disabled
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                                <FormItem>
                                    <FormLabel>CPF</FormLabel>
                                    <FormControl ref={withMask("999.999.999-99")}>
                                    <Input type="text" placeholder="000.000.000-00" {...field} 
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="street"
                                render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                                <FormItem>
                                    <FormLabel>Rua</FormLabel>
                                    <FormControl>
                                    <Input type="address" placeholder="Rua Recife, 78" {...field} 
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="neighborhood"
                                render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                                <FormItem>
                                    <FormLabel>Bairro</FormLabel>
                                    <FormControl>
                                    <Input type="address" placeholder="Centro" {...field} 
                                    />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cityState"
                                render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                                <FormItem>
                                    <FormLabel>Cidade/Estado</FormLabel>
                                    <FormControl>
                                    <Input type="address" placeholder="São Paulo, São Paulo" {...field} 
                                    />
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
                                    <FormControl ref={withMask("(99) 99999-9999")}>
                                    <Input type="text" placeholder="(99) 99999-9999" {...field} 
                                    />
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
                            >
                                { saveButtonSate === 'initial' && 'Salvar' }
                                { saveButtonSate === 'loading' ? <div className="spinner"></div> : null }
                                { saveButtonSate === 'completed' && 'Informações Atualizadas' }
                                { saveButtonSate === 'error' && 'Erro ao Atualizar' }
                            </Button>
                        </div>
                </form>
            </Form> 
        </>
    )
}

