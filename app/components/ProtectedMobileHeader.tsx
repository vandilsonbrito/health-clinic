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

    const handleMenuClick = (sectionNum: number) => {
        setSectionNumber(sectionNum);
        //console.log("Clicou Seção",  sectionNum);
    }

    return (
      <header className='w-full h-[4.5rem] flex justify-between items-center font-medium px-5 md:px-14 bg-white shadow-lg sticky top-0 z-50'>
          <Link href="/">
              <Image 
                src={Logo} 
                alt="Logo" 
                className='w-[5.5rem]' 
                width={200} 
                height={200}
                />
            </Link>

          <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="rounded-xl border px-2 py-1 flex items-center gap-x-3">
                    <MenuIcon className="text-blueSecundary w-6 h-6 lg:w-5 lg:h-5"/>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[200px]">

                    <DropdownMenuItem>
                        <Button 
                            onClick={() => handleMenuClick(1)}
                            className='bg-transparent hover:bg-transparent text-black active:scale-x-[.98]'>
                            Marcar Consulta
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button 
                            onClick={() => handleMenuClick(2)}
                            className='bg-transparent hover:bg-transparent text-black active:scale-x-[.98]'>
                            Consultas Agendadas
                        </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Button 
                            onClick={() => handleMenuClick(3)}
                            className='bg-transparent hover:bg-transparent text-black active:scale-x-[.98]'>
                            Atualizar Perfil
                        </Button>
                    </DropdownMenuItem>
                    
                <DropdownMenuSeparator/>

                <DropdownMenuItem>
                    <Button asChild className='px-7 max-w-28 bg-bluePrimary hover:bg-blueSecundary  active:scale-x-[.98]'>
                        <Link href="" className="w-full" onClick={() => logout()}>Sair</Link>
                    </Button>          
                </DropdownMenuItem>
            </DropdownMenuContent>

        </DropdownMenu>  
          
          
      </header>
    )
}
