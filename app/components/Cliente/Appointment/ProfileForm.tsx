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
import { updateDBData, useDataFromDB } from '@/firebase/firebaseDBServices';
import useGlobalStore from '@/utils/globalStorage';
import { formSchema } from '@/utils/schemas/profile-form-schema';
import toast from 'react-hot-toast';

export default function ProfileForm() {
    
    const { userAuth } = useAuth();
    const [saveButtonSate, setSaveButtonState] = useState<'initial' | 'loading' | 'completed' | 'error'>('initial');
    const { data: userProfileData } = useDataFromDB({ 
        route: 'users/' + userAuth?.uid + '/profile', 
        queryKey: 'user-profile-data' 
    });
    const { setIsUserProfileDBFilled, setCameFromSignUp } = useGlobalStore();


    async function onSubmit(values: z.infer<typeof formSchema>) {  
        setIsUserProfileDBFilled(false);

        const userData = {
            name: values.name,
            email: values.email,
            cpf: values.cpf,
            street: values.street,
            neighborhood: values.neighborhood,
            cityState: values.cityState,
            cellphone: values.cellphone,
            lastAppointmentDate: '',
            totalOfAppointments: 0,
            nextAppointments: ['']
        } 
        setSaveButtonState('loading');
        const itWasUpdated = await updateDBData({ 
            route: 'users/' + userAuth?.uid + '/profile', 
            data: userData
        });
        if(itWasUpdated === 200) {
            setSaveButtonState('completed');
            setTimeout(() => {
                setIsUserProfileDBFilled(true);
            }, 500)
        }
        else {
            setSaveButtonState('error');
        }
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: userAuth?.displayName || "",
            email: userAuth?.email || "",
            cpf: userProfileData?.cpf || "",
            street: userProfileData?.street || "",
            neighborhood: userProfileData?.neighborhood || "",
            cityState: userProfileData?.cityState || "",
            cellphone: userProfileData?.cellphone || "",
        },
    });


    useEffect(() => {
        const waitAppFinishLoading = setTimeout(() => {
            setCameFromSignUp(false);
        }, 500);

        return () => clearTimeout(waitAppFinishLoading);
    }, [setCameFromSignUp]);

    useEffect(() => {
        if(!userProfileData) return;

        const { username, email, cpf, street, neighborhood, cityState, cellphone } = userProfileData;

        form.reset({
            name: userAuth?.displayName || username || "",
            email: email || "",
            cpf: cpf || "",
            street: street || "",
            neighborhood: neighborhood || "",
            cityState: cityState || "",
            cellphone: cellphone || "",
        });
        console.log('User Profile Data', userProfileData)
        if(cpf && street && neighborhood && cityState && cellphone) {
            setIsUserProfileDBFilled(true)
            toast.success('Perfil atualizado com sucesso!')
        }

    }, [userProfileData, form, userAuth, setIsUserProfileDBFilled]);

    useEffect(() => {
        if(saveButtonSate === 'completed'){
            const returnSate = setTimeout(() => {
                setSaveButtonState('initial');
            }, 3000);
            
            return () => clearTimeout(returnSate);
        }
    }, [saveButtonSate])

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full flex flex-wrap space-y-5"
                >
                    <div className="w-full flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }: { field: React.InputHTMLAttributes<HTMLInputElement> }) => (
                            <FormItem>
                                <FormLabel className='font-medium'>Nome Completo</FormLabel>
                                <FormControl>
                                <Input type="name" placeholder={userAuth?.displayName || "nome"} {...field} value={userAuth?.displayName || userProfileData?.name || ""} disabled/>
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
                                <FormLabel className='font-medium'>Email</FormLabel>
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
                                <FormLabel className='font-medium'>CPF</FormLabel>
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
                                <FormLabel className='font-medium'>Rua</FormLabel>
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
                                <FormLabel className='font-medium'>Bairro</FormLabel>
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
                                <FormLabel className='font-medium'>Cidade/Estado</FormLabel>
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
                                <FormLabel className='font-medium'>Celular</FormLabel>
                                <FormControl ref={withMask("(99) 99999-9999")}>
                                <Input type="text" placeholder="(99) 99999-9999" {...field}
                                />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
        
                    </div>
                    <Button
                        className="btn w-full min-w-[10rem] md:w-auto py-5 font-semibold bg-blueSecundary hover:bg-bluePrimary "
                        type="submit"
                    >
                        { saveButtonSate === 'initial' && 'Atualizar Perfil' }
                        { saveButtonSate === 'loading' ? <div className="spinner"></div> : null }
                        { saveButtonSate === 'completed' && 'Informações Atualizadas' }
                        { saveButtonSate === 'error' && 'Erro ao Atualizar' }
                    </Button>
            </form>
        </Form>
  
    )
}

