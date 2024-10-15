'use client';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselAppointContainer from './CarouselAppointContainer';
import man2 from '../../../public/man2.jpg';

export default function CarouselSpecialities() {

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
        <div className="slider-container p-3 gap-2">
            <Slider {...settings}>
                <CarouselAppointContainer url={man2} title={'Obstetrícia'}/> 
                <CarouselAppointContainer url={man2} title={'Odontologia'}/> 
                <CarouselAppointContainer url={man2} title={'Cardiologia'}/> 
                <CarouselAppointContainer url={man2} title={'Oftalmologia'}/> 
                <CarouselAppointContainer url={man2} title={'Odontopediatria'}/> 
                <CarouselAppointContainer url={man2} title={'Nutrologia'}/> 
                <CarouselAppointContainer url={man2} title={'Fonoaudiologia'}/> 
                <CarouselAppointContainer url={man2} title={'Endocrinologia'}/> 
                <CarouselAppointContainer url={man2} title={'Psicologia'}/> 
                <CarouselAppointContainer url={man2} title={'Pediatria'}/> 
                <CarouselAppointContainer url={man2} title={'Dermatologia'}/> 
                <CarouselAppointContainer url={man2} title={'Ortopedia'}/> 
            </Slider> 
        </div>
    )
}
