'use client';
//import { Button } from '@/components/ui/button';
import { Link as ScrollLink } from 'react-scroll';
import Link  from 'next/link';
import Logo from '../../../public/logo-clinica-saude.png';
import Image from 'next/image';
import BtnLogIn from './BtnLogIn';
import { useAuth } from '../../../firebase/authContext';
import { Button } from '@/components/ui/button';

export default function Header() {

    const { userAuth, logout } = useAuth();

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
                <Button className="bg-bluePrimary hover:bg-blueSecundary w-28 font-medium active:scale-x-[.98]" onClick={() => logout()}>
                    Logout
                </Button>
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
