'use client';
import React, { useEffect, useState } from 'react'
import { FaCalendarAlt, FaCheckCircle  } from 'react-icons/fa';
import { FaUserDoctor, FaRegClock  } from "react-icons/fa6";
import AvailableSpecialities from './Appointment/AvailableSpecialities';
import AvailableDate from './Appointment/AvailableDate';
import FinishAppointment from './Appointment/FinishAppointment';
import { SectionsObjType } from '../../utils/types';
import useGlobalStore from '@/utils/globalStorage';
import toast, { Toaster } from 'react-hot-toast';
import { Button } from '@/components/ui/button';


export default function ScheduleAppointment() {
    
    const { selectedEspeciality, selectedDate, returnToScheduleAppointmentFirstStep, setReturnToScheduleAppointmentFirstStep, jumpToScheduleAppointmentNextStep,  } = useGlobalStore();

    const [section, setSecion] = useState<React.ReactElement | null>(null);
    const [selectedStep, setSelectedStep] = useState<number>(1);

    const handleScheduleSection = (sectionNumber: number) => {
        const sections: SectionsObjType = {
            1: <AvailableSpecialities />,
            2: <AvailableDate />,
            3: <FinishAppointment />
        }
        if((sectionNumber === 2 && !selectedEspeciality[0]) || (sectionNumber === 3 && !selectedDate[0])){
            toast('Escolha uma opção!', { style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }, });
            return;
        }
        setSelectedStep(sectionNumber);
        setSecion(sections[sectionNumber || 1]);
    }

    useEffect(() => {
        setSecion(<AvailableSpecialities />);
    }, []);

    useEffect(()=> {
        if(jumpToScheduleAppointmentNextStep) {
            const delay = setTimeout(() => {
                handleScheduleSection(selectedStep + 1);
            }, 500);
            

            return () => clearTimeout(delay);
        }
    }, [jumpToScheduleAppointmentNextStep])

    useEffect(() => {
        if(returnToScheduleAppointmentFirstStep) {
            setSecion(<AvailableSpecialities />);
            setSelectedStep(1);
        } 
        setReturnToScheduleAppointmentFirstStep(false);
    }, [returnToScheduleAppointmentFirstStep]);
    
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="w-full h-full ">

                <div className='w-full p-2 xl:p-5 mt-1 xl:mt-0 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
                    <FaCalendarAlt className='text-2xl xl:text-4xl' />
                    <h1>Marcar Consulta</h1>
                </div>
                <div className="w-full h-full border mt-5 ">
                    <div className="w-full h-full p-3 hidden xl:block">
                        <ul className="flex items-center gap-6 border-b pb-5">
                            <li>
                                <button
                                    onClick={() => handleScheduleSection(1)}
                                    className={`w-[19rem] h-[7rem] flex items-center justify-around rounded-md border p-4 hover:bg-bluePrimary hover:text-white transform ease-in-out duration-200 ${selectedStep === 1 ? 'selected-container ' : ''}`}>
                                    <FaUserDoctor className='text-3xl'/>
                                    <div className="flex flex-col justify-end">
                                        <p className='font-medium text-end'>Especialidade</p>
                                        <p>Escolha a Especialidade</p>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScheduleSection(2)}
                                    className={`w-[19rem] h-[7rem] flex items-center justify-around rounded-md border p-4 hover:bg-bluePrimary hover:text-white transform ease-in-out duration-200 ${selectedStep === 2 ? 'selected-container ' : ''}`}>
                                    <FaRegClock  className='text-3xl'/>
                                    <div className="flex flex-col justify-end">
                                        <p className='font-medium text-end'>Data/Horário</p>
                                        <p>Escolha a Data</p>
                                    </div>
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleScheduleSection(3)}
                                    className={`w-[19rem] h-[7rem] flex items-center justify-around rounded-md border p-4 hover:bg-bluePrimary hover:text-white transform ease-in-out duration-200 ${selectedStep === 3 ? 'selected-container ' : ''}`}>
                                    <FaCheckCircle  className='text-3xl'/>
                                    <div className="flex flex-col justify-end">
                                        <p className='font-medium text-end'>Concluir</p>
                                        <p>Finalizar Agendamento</p>
                                    </div>
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="p-3 pb-8 ">
                        {section}
                    </div>


                    <div className={`xl:hidden w-full h-full flex justify-between items-center p-2 mt-4 sm:px-5  ${selectedStep === 3 && 'hidden'}`}>
                        <Button 
                            onClick={() => handleScheduleSection(selectedStep - 1)}
                            className="bg-transparent text-blueSecundary hover:bg-bluePrimary hover:text-white font-semibold border"
                            >Voltar</Button>
                        <Button 
                            onClick={() => handleScheduleSection(selectedStep + 1)}
                            className="bg-blueSecundary hover:bg-bluePrimary"
                            >Avançar</Button>
                    </div>
                </div>

            </div>
        </>
    )
}
