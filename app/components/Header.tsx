'use client';
import { Button } from '@/components/ui/button';
import { Link } from 'react-scroll';
import React from 'react';
import Logo from '../../public/logo-clinica-saude.png'
import Image from 'next/image';

export default function Header() {
  return (
    <header className='w-full h-[4.5rem] flex justify-center items-center font-medium px-5 md:px-14 bg-white shadow-lg sticky top-0 z-50' >
        <div className="w-full h-full max-w-7xl flex justify-between items-center">
          <Image src={Logo.src} alt="Logo" className='w-[5.5rem]' width={88} height={88}/>
          <nav className='w-full max-w-[35rem]'>
              <ul className='w-full flex items-center justify-end lg:justify-between'>
                  <li className="cursor-pointer hidden lg:block">
                    <Link to="top" smooth={true} duration={300}>Home</Link >
                  </li>
                  <li className="cursor-pointer hidden lg:block">
                    <Link to="who-we-are" smooth={true} duration={300} offset={-100}>Quem Somos</Link >
                  </li>
                  <li className="cursor-pointer hidden lg:block">
                    <Link to="especialidades" smooth={true} duration={300} offset={-50}>Especialidades</Link >
                  </li>
                  <li>
                      <Button className="bg-bluePrimary w-28 font-medium">Login</Button>
                  </li>
              </ul>
          </nav>
        </div>
    </header>
  )
}
