'use client';
import { useEffect } from "react";
import Aos from 'aos';
import React from 'react'
import CarouselContainer from './CarouselContainer';
import { MoveRight } from 'lucide-react';
import Link from "next/link";


export default function Testemonials() {

  useEffect(() => {
    Aos.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      offset: 70
    })
  }, []);

  return (
    <section className='w-full h-full flex flex-col items-center justify-center gap-16 px-7 md:px-14 bg-white text-black py-10' data-aos="fade-up">
        <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-16">
          <div className="w-full lg:w-[30rem] h-full flex flex-col gap-2">
            <h2 className="text-3xl font-semibold text-left">Depoimentos</h2>
            <p className="text-base font-medium text-left">Veja como nossos serviços têm impactado positivamente a vida de nossos pacientes. Confira os depoimentos de quem já passou por aqui e sentiu a diferença de estar em boas mãos.</p>
          </div>
          <div className="w-full max-w-[35rem] py-7 lg:py-10 overflow-hidden shadow-2xl rounded-md">
              <CarouselContainer/>
          </div>
        </div>
        <Link href='/agendamento' className="w-60 flex items-center justify-center p-3 text-white bg-bluePrimary hover:shadow-2xl ease-linear rounded-xl gap-3 text-[1.1rem] font-semibold">
            Agendar consulta
            <MoveRight />
        </Link>
    </section>
  )
}
