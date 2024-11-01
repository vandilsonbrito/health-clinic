'use client';
import React, { useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';
import { FaCalendarAlt, FaCalendarCheck, FaUserCircle   } from "react-icons/fa";
import ScheduleAppointment from '../components/ScheduleAppointment';
import ProtectedMobileHeader from '../components/ProtectedMobileHeader';
//import { useAuth } from '@/firebase/authContext';
import ScheduledConsultation from '../components/ScheduledConsultation';
import UpdateProfile from '../components/UpdateProfile';
import { SectionsObjType } from '@/utils/types';
import useGlobalStore from '@/utils/globalStorage';


export default function Agendamento() {

    //const { userAuth, authLoading, login, logout } = useAuth();
    const { isAppointmentScheduled } = useGlobalStore();
    const [section, setSecion] = useState<React.ReactElement | null>(null);
    const [selectedStep, setSelectedStep] = useState<number>(1);

    const handleSection = (sectionNumber: number) => {
        const sections: SectionsObjType = {
            1: <ScheduleAppointment/>,
            2: <ScheduledConsultation/>,
            3: <UpdateProfile/>,
        }
        setSelectedStep(sectionNumber);
        setSecion(sections[sectionNumber || 1]);
    }

    useEffect(() => {
        setSecion(<ScheduleAppointment/>);
    }, []);

    useEffect(() => {
        if(isAppointmentScheduled) {
            const waitInterval = setTimeout(() => {
                setSecion(<ScheduledConsultation />);
                setSelectedStep(2)
            }, 1000);

            return () => clearTimeout(waitInterval); 
        }
    }, [isAppointmentScheduled]);

    return (
        <ProtectedRoute>
            <div className="hidden xl:block">
                <Header/>
            </div>
            <div className="xl:hidden">
                <ProtectedMobileHeader/>
            </div>
            
            <main className='w-full h-full min-h-[calc(100vh-4.5rem)] flex items-start bg-white '>
                <section className="w-[20%] 2xl:w-[30%] h-full min-h-[calc(100vh-4.5rem)] bg-blueSecundary pb-5 text-white  hidden xl:block ">
                    <nav className="w-full h-full flex flex-col py-5">
                        <ul className='flex flex-col gap-2'>
                            <li>
                                <button
                                    onClick={() => handleSection(1)} 
                                    className={`w-full px-5 py-3 flex items-center gap-2 font-medium text-lg hover:bg-bluePrimary cursor-pointer transform ease-in-out duration-200 ${selectedStep === 1 && 'selected-option'}`}>
                                    <FaCalendarAlt  className='mb-1'/>
                                    Marcar Consulta
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSection(2)} 
                                    className={`w-full px-5 py-3 flex items-center gap-2 font-medium text-lg hover:bg-bluePrimary cursor-pointer transform ease-in-out duration-200 ${selectedStep === 2 && 'selected-option'}`}>
                                    <FaCalendarCheck  className='mb-1'/>
                                    Consultas Agendadas
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSection(3)} 
                                    className={`w-full px-5 py-3 flex items-center gap-2 font-medium text-lg hover:bg-bluePrimary cursor-pointer transform ease-in-out duration-200 ${selectedStep === 4 && 'selected-option'}`}>
                                    <FaUserCircle  className='mb-[3px]'/>
                                    Atualizar Perfil
                                </button>
                            </li>
                        </ul>
                    </nav>
                </section>
                <section className="w-full xl:w-[80%] 2xl:w-[70%] h-full p-2">
                    {section}
                </section>
            </main>
        </ProtectedRoute>
    )
}
