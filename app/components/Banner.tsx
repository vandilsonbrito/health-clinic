import { MoveRight } from 'lucide-react';

export default function Banner() {
  return (
    <section className="w-full md:max-w-2xl lg:max-w-7xl h-[36rem] pt-14 pb-10 overflow-hidden bg-white" >
        <div className="w-full h-full flex flex-col-reverse lg:flex-row md:gap-20 lg:gap-0 bg-bluePrimary rounded-[3rem]" >

            <div className="w-full lg:w-1/2 h-full flex flex-col justify-start lg:justify-center gap-8 lg:gap-5 px-10 md:px-36 lg:pl-32 lg:pr-14 ">
                <h1 className="text-3xl md:text-4xl lg:text-[3rem] text-white font-bold lg:leading-[3.1rem]">Sua Saúde é nossa prioridade.</h1>
                <button className="w-full lg:w-60 flex items-center justify-center px-3 py-2 bg-white text-bluePrimary hover:shadow-2xl ease-linear rounded-lg gap-3 text-[1.1rem] font-semibold">
                    Agendar consulta
                    <MoveRight />
                </button>
            </div>

            <div className="w-full lg:w-1/2 h-full relative md:top-10 lg:top-0">
                <div className="w-full h-full flex justify-center items-center absolute right:6 lg:right-8">
                  <div className="w-[200px] h-[200px] lg:w-[400px] lg:h-[400px] bg-blueSecundary rounded-[3rem]"></div>
                  <div className="w-full h-[15rem] lg:h-[32.5rem] bg-heroImg bg-no-repeat bg-contain absolute -top-5 left-[6.7rem] md:-top-10  md:left-[16rem] lg:-top-10 lg:left-[7.5rem] z-10 "></div>
                </div>
            </div>
        </div>
    </section>
  )
}
