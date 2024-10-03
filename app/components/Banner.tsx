import { MoveRight } from 'lucide-react';

export default function Banner() {
  return (
    <section className="w-full max-w-7xl h-[35rem] pt-14 pb-12 overflow-hidden bg-white" >
        <div className="w-full h-full flex bg-bluePrimary rounded-[3rem]" >

            <div className="w-1/2 h-full flex flex-col justify-center gap-5 pl-32 pr-14 ">
                <h1 className="text-[3rem] text-white font-bold leading-snug">Sua Saúde é nossa prioridade.</h1>
                <button className="w-60 flex items-center justify-center px-3 py-2 bg-white text-bluePrimary hover:shadow-2xl ease-linear rounded-lg gap-3 text-[1.1rem] font-semibold">
                    Agendar consulta
                    <MoveRight />
                </button>
            </div>

            <div className="w-1/2 h-full relative ">
                <div className="w-full h-full flex justify-center items-center absolute right-8">
                  <div className="w-[400px] h-[400px] bg-blueSecundary rounded-[3rem]"></div>
                  <div className="w-full h-[31rem] bg-heroImg bg-no-repeat bg-contain absolute -top-10 left-[7.5rem] z-10 "></div>
                </div>
            </div>
        </div>
    </section>
  )
}
