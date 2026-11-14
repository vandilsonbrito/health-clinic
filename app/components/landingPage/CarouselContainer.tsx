'use client';
import React from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TestemonialCard from './TestemonialCard';
import woman1 from '../../../public/woman1.jpg';
import woman2 from '../../../public/woman2.jpg';
import woman3 from '../../../public/woman3.jpg';
import woman4 from '../../../public/woman4.jpg';
import man1 from '../../../public/man1.jpg';
import man2 from '../../../public/man2.jpg';


export default function CarouselContainer() {
  
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 300,
    autoplaySpeed: 5000,
    cssEase: "linear"
  };

  return (
      <div className="slider-container">
        <Slider {...settings}> 
            <TestemonialCard 
              url={woman1} 
              name={'Bruna Freitas'}
              feedback={'"Fiquei impressionado com a atenção da equipe médica. Sempre preocupados em entender minhas necessidades. Recomendo muito pela qualidade e cuidado no atendimento!"'}
            />
            <TestemonialCard 
              url={man1} 
              name={'Pedro Teixeira'}
              feedback={'"A equipe é extremamente qualificada e dedicada. Senti que estava em ótimas mãos desde a primeira consulta. Confiança total nos especialistas!"'}
            />
            <TestemonialCard 
              url={woman2} 
              name={'Júlia Galantini'}
              feedback={'"A clínica me surpreendeu com um atendimento atencioso e personalizado. A equipe foi cuidadosa em me ouvir e garantir que eu estivesse confortável. Me senti muito acolhida."'}
            />
            <TestemonialCard 
              url={woman3} 
              name={'Rebeca Amado'}
              feedback={'"O sistema de agendamento é prático e a clínica é muito organizada. Além disso, a equipe é super profissional e o atendimento sempre foi pontual. Fico muito satisfeita com os serviços!"'}
            />
            <TestemonialCard 
              url={man2} 
              name={'Henrique Santos'}
              feedback={'"Desde a recepção até a consulta, todos os profissionais foram extremamente atenciosos. A clínica oferece um atendimento humanizado que faz toda a diferença!"'}
            />
            <TestemonialCard 
              url={woman4} 
              name={'Helena Rebouças'}
              feedback={'"A clínica tem um excelente ambiente e a equipe é altamente qualificada. Senti que realmente se preocupam com o bem-estar dos pacientes. Fiquei muito satisfeito com o tratamento."'}
            />
        </Slider>
      </div>
  )
}
