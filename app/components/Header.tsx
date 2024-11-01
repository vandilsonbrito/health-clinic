'use client';
//import { Button } from '@/components/ui/button';
import { Link } from 'react-scroll';
import React, { useEffect } from 'react';
import Logo from '../../public/logo-clinica-saude.png';
import Image from 'next/image';
import BtnLogIn from './BtnLogIn';
import { useAuth } from '../../firebase/authContext';
import { Button } from '@/components/ui/button';

export default function Header() {

    /* const router = useRouter(); */
    const { userAuth, login, logout } = useAuth();

    useEffect(() => {
      console.log('UserAuth', userAuth);
    }, [userAuth, login, logout]);


    return (
      <header className='w-full h-[4.5rem] flex justify-center items-center font-medium px-5 md:px-14 bg-white shadow-lg sticky top-0 z-50' >
          <div className="w-full h-full flex justify-between items-center">
            <Image src={Logo} alt="Logo" className='w-[5.5rem]' width={200} height={200}/>

            {
              userAuth ?
              (
                <Button className="bg-bluePrimary hover:bg-blueSecundary w-28 font-medium active:scale-x-[.98]" onClick={() => logout()}>
                    Logout
                </Button>
              )
              :
              (
                <nav className='w-full '>
                    <ul className='w-full flex items-center justify-end lg:justify-between'>
                        <li className="cursor-pointer hidden lg:block">
                          <Link to="top" smooth={true} duration={300} offset={-200}>Home</Link >
                        </li>
                        <li className="cursor-pointer hidden lg:block">
                          <Link to="who-we-are" smooth={true} duration={300} offset={-100}>Quem Somos</Link >
                        </li>
                        <li className="cursor-pointer hidden lg:block">
                          <Link to="especialidades" smooth={true} duration={300} offset={-50}>Especialidades</Link >
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
