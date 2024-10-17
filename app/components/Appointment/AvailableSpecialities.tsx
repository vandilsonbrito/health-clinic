'use client';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselAppointContainer from './CarouselAppointContainer';
import man2 from '../../../public/man2.jpg';

export default function AvailableSpecialities() {

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: false,
        speed: 300,
        autoplaySpeed: 5000,
        cssEase: "linear"
    };
    
    return (
        <div className="flex flex-col gap-4">
            <h2 className='font-medium'>Especialidades Disponíveis</h2>
            <div className="slider-container p-3 pb-0 gap-2">
                <Slider {...settings}>
                    <CarouselAppointContainer url={man2} especiality={'Obstetrícia'} professionalName={'Rodrigo Peixoto'}/>
                    <CarouselAppointContainer url={man2} especiality={'Odontologia'} professionalName={'Lucas Mendes'}/>
                    <CarouselAppointContainer url={man2} especiality={'Cardiologia'} professionalName={'Thiago Silva'}/>
                    <CarouselAppointContainer url={man2} especiality={'Oftalmologia'} professionalName={'Marina Castro'}/>
                    <CarouselAppointContainer url={man2} especiality={'Odontopediatria'} professionalName={'Julia Lemos'}/>
                    <CarouselAppointContainer url={man2} especiality={'Nutrologia'} professionalName={'Mateus Bonfim'}/>
                    <CarouselAppointContainer url={man2} especiality={'Fonoaudiologia'} professionalName={'Cristina Fernandes'}/>
                    <CarouselAppointContainer url={man2} especiality={'Endocrinologia'} professionalName={'João Pedro Lima'}/>
                    <CarouselAppointContainer url={man2} especiality={'Psicologia'} professionalName={'Bruna Souza'}/>
                    <CarouselAppointContainer url={man2} especiality={'Pediatria'} professionalName={'Letícia Carvalho'}/>
                    <CarouselAppointContainer url={man2} especiality={'Dermatologia'} professionalName={'Luana Peixoto'}/>
                    <CarouselAppointContainer url={man2} especiality={'Ortopedia'} professionalName={'Marcos Trindade'}/>
                </Slider>
            </div>
        </div>
    )
}
