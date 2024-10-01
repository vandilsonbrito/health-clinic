import { Button } from '@/components/ui/button'
import React from 'react'

export default function Header() {
  return (
    <header className='w-full h-[5rem] flex justify-between items-center font-medium'>
        <p>LOGO</p>
        <nav className='w-full max-w-[35rem]'>
            <ul className='w-full flex items-center justify-between'>
                <li>Home</li>
                <li>Quem Somos</li>
                <li>Especialidades</li>
                <li>
                    <Button className="bg-bluePrimary w-28 font-medium">Login</Button>
                </li>
            </ul>
        </nav>
    </header>
  )
}
