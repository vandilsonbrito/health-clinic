import React from 'react'
import CarouselContainer from './CarouselContainer';
import { MoveRight } from 'lucide-react';


export default function Testemonials() {
  return (
    <section className='w-full h-full flex flex-col items-center justify-center gap-16 px-5 md:px-14 bg-white py-10'>
        <div className="w-full h-full flex items-center justify-center gap-16">
          <div className="w-[30rem] h-full flex flex-col gap-2">
            <h2 className="text-bluePrimary text-3xl font-semibold text-left">Depoimentos</h2>
            <p className="text-[#0693dade] text-base font-semibold text-left">Veja como nossos serviços têm impactado positivamente a vida de nossos pacientes. Confira os depoimentos de quem já passou por aqui e sentiu a diferença de estar em boas mãos.</p>
          </div>
          <div className="w-full max-w-[35rem] py-10 overflow-hidden shadow-2xl rounded-md">
              <CarouselContainer/>
          </div>
        </div>
        <button className="w-60 flex items-center justify-center p-3 text-white bg-bluePrimary hover:shadow-2xl ease-linear rounded-xl gap-3 text-[1.1rem] font-semibold">
            Agendar consulta
            <MoveRight />
        </button>
    </section>
  )
}
