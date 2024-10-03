'use client';
import { Button } from '@/components/ui/button';
import { Link } from 'react-scroll';
import React from 'react';
import Logo from '../../public/logo-clinica-saude.png'

export default function Header() {
  return (
    <header className='w-full h-[5rem] flex justify-between items-center font-medium px-5 md:px-14 bg-white shadow-lg sticky top-0 z-50' >
        <img src={Logo.src} alt="Logo" className='w-[6.5rem]'/>
        <nav className='w-full max-w-[35rem]'>
            <ul className='w-full flex items-center justify-between'>
                <li className="cursor-pointer">
                  <Link to="top" smooth={true} duration={300}>Home</Link >
                </li>
                <li className="cursor-pointer">
                  <Link to="" smooth={true} duration={300}>Quem Somos</Link >
                </li>
                <li className="cursor-pointer">
                  <Link to="especialidades" smooth={true} duration={300}>Especialidades</Link >
                </li>
                <li>
                    <Button className="bg-bluePrimary w-28 font-medium">Login</Button>
                </li>
            </ul>
        </nav>
    </header>
  )
}
