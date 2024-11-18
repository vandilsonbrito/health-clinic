'use client';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselSpecialistsContainer from './CarouselSpecialistsContainer';
import man2 from '../../../public/man2.jpg';
import { useDataFromDB } from '@/firebase/databaseCRUDFunctions';
import useMedia from 'use-media';
import useGlobalStore from '@/utils/globalStorage';

export default function AvailableSpecialities() {

    const { data: specialistsData } = useDataFromDB({route: 'services/consultation', queryKey: 'especiality-services-data' });
    const { setJumpToScheduleAppointmentNextStep } = useGlobalStore();
    const [especiality, setEspeciality] = useState<string[]>([]);
    const [professionalsName, setProfessionalsName] = useState<string[]>([]);
    
    const isSuperMobile = useMedia({maxWidth: '400px'});
    const isMobile = useMedia({maxWidth: '530px'});
    const isMediumMobile = useMedia({maxWidth: '1020px'});

    useEffect(() => {
        function fetchData() {
            if(specialistsData) {
                const auxArr: string[] = [], auxArr2: string[] = [];

                for(const especiality in specialistsData) {
                    for(const professional in specialistsData[especiality]) {
                        auxArr.push(specialistsData[especiality][professional].especiality);
                        auxArr2.push(specialistsData[especiality][professional].name);
                    }
                }

                setEspeciality(auxArr);   
                setProfessionalsName(auxArr2);
            }
        }  
        fetchData();

        setJumpToScheduleAppointmentNextStep(false);
    }, [specialistsData, setJumpToScheduleAppointmentNextStep]);

    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: isSuperMobile ? 2 : isMobile ? 3 : isMediumMobile ? 4 : 6,
        slidesToScroll: isSuperMobile ? 2 : isMobile ? 3 : isMediumMobile ? 4 : 6,
        autoplay: false,
        speed: 300,
        cssEase: "linear",
    
    };
    
    return (
        <div className="flex flex-col gap-2  available-specialists">
            <div>
                <h2 className='font-medium'>Especialidades Disponíveis</h2>
                <p className='text-[.7rem]'>* Selecione uma especialidade</p>
            </div>
            <div className="slider-container px-0 py-3 sm:px-3 pb-0 gap-2">
                {
                    especiality && especiality.length > 0 ?
                    (
                        <Slider {...settings}>
                            {
                                especiality?.map((item, index) => {
                                    return (
                                    <CarouselSpecialistsContainer key={index} url={man2} especiality={item} professionalName={professionalsName[index]}/>
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
