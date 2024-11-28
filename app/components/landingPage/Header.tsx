'use client';
//import { Button } from '@/components/ui/button';
import { Link as ScrollLink } from 'react-scroll';
import Link  from 'next/link';
import Logo from '../../../public/logo-clinica-saude.png';
import Image from 'next/image';
import BtnLogIn from './BtnLogIn';
import { useAuth } from '../../../firebase/authContext';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MenuIcon } from 'lucide-react';
import { useRouter } from "next/navigation";

export default function Header() {

    const { userAuth, logout } = useAuth();
    const router = useRouter();

    return (
      <header className='w-full h-[4.5rem] flex justify-center items-center font-medium px-5 md:px-14 bg-white shadow-lg sticky top-0 z-50' >
          <div className="w-full h-full flex justify-between items-center">
            <Link href="/">
              <Image 
                src={Logo} 
                alt="Logo" 
                className='w-[5.5rem]' 
                width={200} 
                height={200}
                />
            </Link>
            {
              userAuth ?
              ( 
                <>
                  <nav className="lg:hidden">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <div className="rounded-xl border px-2 py-1 flex items-center gap-x-3">
                                <MenuIcon className="text-blueSecundary w-6 h-6 lg:w-5 lg:h-5"/>
                            </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="center" className="w-[200px]">
                            <DropdownMenuItem>
                                <Button 
                                    onClick={() => router.push('/agendamento')}
                                    className='bg-transparent hover:bg-transparent text-black active:scale-x-[.98]'>
                                    Marcar Consulta
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
                  </nav>
                  <nav className="hidden lg:block">
                    <Button asChild className='px-7 max-w-28 bg-bluePrimary hover:bg-blueSecundary active:scale-x-[.98]'>
                          <Link href="" className="w-full" onClick={() => logout()}>Sair</Link>
                      </Button>  
                  </nav>
                </>
              )
              :
              (
                <nav className='w-full max-w-xl'>
                    <ul className='w-full flex items-center justify-end lg:justify-between'>
                        <li className="cursor-pointer hidden lg:block">
                          <ScrollLink to="top" smooth={true} duration={300} offset={-200}>Home</ScrollLink >
                        </li>
                        <li className="cursor-pointer hidden lg:block">
                          <ScrollLink to="who-we-are" smooth={true} duration={300} offset={-100}>Quem Somos</ScrollLink >
                        </li>
                        <li className="cursor-pointer hidden lg:block">
                          <ScrollLink to="especialidades" smooth={true} duration={300} offset={-50}>Especialidades</ScrollLink >
                        </li>
                        <BtnLogIn/>
                    </ul>
                </nav>
              )
            }
            
          </div>
      </header>
    )
}
