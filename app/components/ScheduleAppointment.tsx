'use client';
import React, { useState } from 'react'
import { FaCalendarAlt, FaCheckCircle  } from 'react-icons/fa';
import { FaUserDoctor, FaRegClock  } from "react-icons/fa6";
import SpecialitiesAvailable from './Appointment/AvailableSpecialities';
import DateAvailable from './Appointment/AvailableDate';
import FinishAppointment from './Appointment/FinishAppointment';
import { SectionsObjType } from '../../utils/types';

export default function ScheduleAppointment() {
    
    const [section, setSecion] = useState<React.ReactElement | null>(null)

    const handleScheduleSection = (sectionNumber: number) => {
        const sections: SectionsObjType = {
            1: <SpecialitiesAvailable />,
            2: <DateAvailable />,
            3: <FinishAppointment />
        }
        setSecion(sections[sectionNumber || 1]);
    }
    
    return (
        <div className="w-full h-full ">
            <div className='w-full p-5 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
                <FaCalendarAlt className='text-4xl' />
                <h1>Marcar Consulta</h1>             
            </div>
            <div className="w-full h-full border mt-5">

                <div className="w-full h-full p-3">
                    <ul className="flex items-center gap-6 border-b pb-5">
                        <li>
                            <button 
                                onClick={() => handleScheduleSection(1)}
                                className="w-[19rem] h-[7rem] flex items-center justify-around rounded-md border p-4 hover:bg-blueSecundary hover:text-white transform ease-in-out duration-200">
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
                                className="w-[19rem] h-[7rem] flex items-center justify-around rounded-md border p-4 hover:bg-blueSecundary hover:text-white transform ease-in-out duration-200">
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
                                className="w-[19rem] h-[7rem] flex items-center justify-around rounded-md border p-4 hover:bg-blueSecundary hover:text-white transform ease-in-out duration-200">
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
                    {section || <SpecialitiesAvailable />}
                </div>
            </div>
        </div>
    )
}