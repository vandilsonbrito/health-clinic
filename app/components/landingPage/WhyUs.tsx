'use client';
import { useEffect } from "react";
import Aos from 'aos';
import React from 'react';
import { FaUserDoctor } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { BsEmojiSmileFill } from "react-icons/bs";


export default function WhyUs() {

    useEffect(() => {
        Aos.init({
          duration: 1000,
          easing: "ease-in-out",
          once: true,
          offset: 20
        })
      }, []);

    return (
        <section className='w-full h-full xl:h-[36rem] flex flex-col lg:flex-row justify-center items-center bg-bluePrimary overflow-hidden px-5 md:px-14 mt-12 mb-0 md:my-12 py-8 xl:py-0' data-aos="fade-up">
            <div className="hidden xl:block w-1/2 max-w-[40rem] h-full relative">
                <div className="w-full h-full flex justify-center items-center absolute right-10">
                    <div className="w-[200px] h-[200px] lg:w-[450px] lg:h-[450px] bg-blueSecundary rounded-[3rem] absolute top-16 left-[6rem]"></div>
                    <div className="w-full h-[14rem] lg:h-[33.5rem] bg-convinceImg bg-no-repeat bg-contain z-10 absolute top-[3.2rem] left-14"></div>
                </div>
            </div>
            
            <div className="w-full xl:w-1/2 max-w-[40rem] h-full flex flex-col justify-center items-center px-5 xl:pl-16 text-white ">
                <div className="w-full h-full flex flex-col justify-center items-center gap-14 bg-[#ffffff0c] p-10 rounded-3xl ">
                    
                    <h2 className='w-full text-3xl font-semibold text-left'>Por que nos escolher?</h2>
                    <div className="w-full h-fit flex flex-col justify-center items-center gap-12 ">
                        <div className="w-full h-fit flex justify-left items-center gap-4">
                            <div className="w-14 h-14 flex items-center justify-center p-3 rounded-full bg-white text-bluePrimary text-4xl">
                                <FaUserDoctor />
                            </div>
                            <h3 className='text-xl font-semibold '>Equipe de Especialistas Altamente Qualificados</h3>
                        </div>
                        <div className="w-full h-fit flex justify-left items-center gap-4">
                            <div className="w-14 h-14 flex items-center justify-center p-3 rounded-full bg-white text-bluePrimary text-4xl">
                                <IoPersonSharp />
                            </div>
                            <h3 className='text-xl font-semibold '>Atendimento Humanizado e Personalizado</h3>
                        </div>
                        <div className="w-full h-fit flex justify-left items-center gap-4">
                            <div className="w-14 h-14 flex items-center justify-center p-3 rounded-full bg-white text-bluePrimary text-4xl">
                                <BsEmojiSmileFill />
                            </div>
                            <h3 className='text-xl font-semibold '>Feedback e Satisfação dos Pacientes</h3>
                        </div>
                </div>

                </div>
            </div>
        </section>
    )
}
