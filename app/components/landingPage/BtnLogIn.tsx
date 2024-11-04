import React from 'react';
import { Button } from '../../../components/ui/button';
import Link from 'next/link';

export default function BtnLogIn() {
  return (
    <li>
        <Button asChild className="bg-bluePrimary hover:bg-blueSecundary w-28 font-medium active:scale-x-[.98]">
            <Link href="/sign-in">Login</Link>
        </Button>
    </li>
  )
}
