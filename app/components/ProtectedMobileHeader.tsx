'use client'
import React from 'react';
import Logo from '../../public/logo-clinica-saude.png';
import Image from 'next/image';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useAuth } from '../../firebase/authContext';
import useGlobalStore from '@/utils/globalStorage';

export default function ProtectedMobileHeader() {

    const { logout } = useAuth();
    const { setSectionNumber } = useGlobalStore();

    return (
      <header className='w-full h-[4.5rem] flex justify-between items-center font-medium px-5 md:px-14 bg-white shadow-lg sticky top-0 z-50 xl:hidden'>
          <Image src={Logo} alt="Logo" className='w-[5.5rem]' width={200} height={200}/>

          <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-xl border px-2 py-1 flex items-center gap-x-3">
                    <MenuIcon className="text-blueSecundary w-6 h-6 lg:w-5 lg:h-5"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px]">

                    <DropdownMenuItem>
                        <Button 
                            onClick={() => setSectionNumber(1)}
                            className='bg-transparent hover:bg-transparent text-black active:scale-x-[.98]'>
                            Marcar Consulta
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button 
                            onClick={() => setSectionNumber(2)}
                            className='bg-transparent hover:bg-transparent text-black active:scale-x-[.98]'>
                            Consultas Agendadas
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button 
                            onClick={() => setSectionNumber(3)}
                            className='bg-transparent hover:bg-transparent text-black active:scale-x-[.98]'>
                            Atualizar Perfil
                        </Button>
                    </DropdownMenuItem>
                    
                <DropdownMenuSeparator/>

                <DropdownMenuItem>
                    <Button asChild className='bg-bluePrimary  active:scale-x-[.98]'>
                        <Link href="" className="w-full" onClick={() => logout()}>Log out</Link>
                    </Button>          
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>  
          
          
      </header>
    )
}
