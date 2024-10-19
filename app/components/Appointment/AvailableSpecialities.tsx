'use client';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselAppointContainer from './CarouselAppointContainer';
import man2 from '../../../public/man2.jpg';
import { getData } from '@/firebase/databaseFunc';
//import { ProfessionalData } from '@/utils/types';
import useMedia from 'use-media';
import useGlobalStore from '@/utils/globalStorage';

export default function AvailableSpecialities() {

    const { setJumpToNextStep } = useGlobalStore();
    //const [servicesData, setServicesData] = useState<ProfessionalData[] | null>(null);
    const [especiality, setEspeciality] = useState<string[]>([]);
    const [professionalsName, setProfessionalsName] = useState<string[]>([]);

    useEffect(() => {
        async function fetchData() {
            const data = await getData({route: 'services/consultation'});
            if(data) {
                const auxArr: string[] = [], auxArr2: string[] = [];
            
                console.log("Data", data)

                for(const especiality in data) {
                    for(const professional in data[especiality]) {
                        auxArr.push(data[especiality][professional].especiality);
                        auxArr2.push(data[especiality][professional].name);
                    }
                }

                setEspeciality(auxArr);   
                setProfessionalsName(auxArr2);
            }
        }  
        fetchData();

        setJumpToNextStep(false);
    }, []);

    /* useEffect(() => {
        console.log("especiality", especiality);
        console.log("professionalsName", professionalsName);
    }, [especiality, professionalsName]) */

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
            <div className="slider-container px-0 py-3 sm:p-3 pb-0 gap-2">
                {
                    especiality && especiality.length > 0 ?
                    (
                        <Slider {...settings}>
                            {
                                especiality?.map((item, index) => {
                                    return (
                                    <CarouselAppointContainer key={index} url={man2} especiality={item} professionalName={professionalsName[index]}/>
                                    )
                                })
                            }             
                        </Slider> 
                    )
                    :
                    (
                        <div className="w-full h-full min-h-[13rem] flex flex-col justify-center items-center">
                            <p className='text-lg mb-4'>Loading</p>
                            <span className="loader"></span>
                        </div> 
                    )
                }
                   
            </div>
        </div>
    )
}
