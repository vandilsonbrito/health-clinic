import React from 'react';

export default function WhoWeAre() {
  return (
    <section className="w-full max-w-6xl h-full flex flex-col-reverse xl:flex-row items-start  px-8 xl:px-0 py-10 lg:py-12 text-black " id="who-we-are">
        <div className="w-full h-full mt-7 lg:mt-0">
            <div className="w-full h-full flex justify-center md:items-center xl:items-start ">
                <div className="w-full md:w-[24rem] xl:w-full h-[13rem] md:h-[16rem] xl:h-[21rem] bg-whoWeAreImg bg-no-repeat bg-contain lg:mt-4 xl:mt-0"></div>
            </div>
        </div>
        <div className="w-full h-full flex flex-col gap-4">
            <h2 className='w-full text-3xl font-semibold text-left -mt-[0.45rem]'>Quem Somos</h2>
            <p className='font-medium'>Nossa clínica nasceu com o propósito de oferecer um atendimento médico de qualidade, baseado em um relacionamento próximo e acolhedor com nossos pacientes. Com uma equipe de <strong>especialistas altamente qualificados</strong> e <strong>dedicados ao bem-estar de cada pessoa</strong>, estamos comprometidos em proporcionar um atendimento <strong>humanizado</strong> e <strong>personalizado</strong>, focado nas necessidades específicas de cada paciente.</p>

            <div className="w-full h-full flex flex-col gap-2 font-medium">
                <h3 className="text-lg font-semibold">Nossa Missão</h3>
                <p>Prover cuidados de saúde excepcionais com ética, profissionalismo e empatia, promovendo a saúde e o bem-estar de todos que confiam em nossos serviços.</p>
            </div>

        </div>
    </section>
  )
}
