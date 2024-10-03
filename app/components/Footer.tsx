import React from 'react';
import Logo from '../../public/logo-clinia-saude-white.png';
import { RxInstagramLogo } from "react-icons/rx";
import { FaWhatsapp } from "react-icons/fa";


export default function Footer() {
  return (
    <footer className='w-full h-full flex flex-col justify-center items-center gap-8 pt-10  bg-bluePrimary text-white'>
        <div className="w-full max-w-7xl h-full flex justify-center items-center px-5 md:px-14">

            <div className="w-fit flex gap-24 items-center justify-center">
                <div className="w-fit h-fit flex flex-col items-start justify-center gap-5">
                    <img src={Logo.src} alt="Logo" className='w-44'/>
                    <address className='w-[13rem] text-sm'>
                        <p>Rua Quatrocentos e Quinze, n° 578, Centro, Avante</p>
                    </address>
                </div>
                <div className="flex flex-col gap-5 ">
                    <h3 className='font-semibold text-xl text-center'>Contato</h3>
                    <div className="flex justify-center items-center gap-20">
                        <div className="flex flex-col gap-4">
                            <p>(00) 00000 - 0000</p>
                            <div className="flex items-center gap-3">
                                <a href="#" className='w-10 h-10 flex justify-center items-center rounded-full bg-transparent border text-white text-2xl hover:border-blueSecundary transition duration-150 ease-in'>
                                    <RxInstagramLogo  />
                                </a>
                                <p>Instagram</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <p className='font-medium'>Alternativa de Agendamento</p>
                            <div className="flex items-center gap-3">
                                <a href="#" className='w-10 h-10 flex justify-center items-center rounded-full bg-transparent border text-white text-2xl hover:border-blueSecundary transition duration-150 ease-in'>
                                    <FaWhatsapp  />
                                </a>
                                <p>Whatsapp</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div className="w-full h-full py-3 text-sm text-center bg-white text-bluePrimary font-medium">
            <p>Copyright &copy; 2024. Clínica + Saúde, todos os direitos reservados. Desenvolvido por <a href="https://vandilson-portfolio.vercel.app" className='underline' target="_blank" rel="noopener noreferrer">Vandilson Brito</a>.</p>
        </div>
    </footer>
  )
}
