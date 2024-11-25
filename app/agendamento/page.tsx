'use client';
import React, { useCallback, useEffect, useState } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/landingPage/Header';
import { FaCalendarAlt, FaCalendarCheck, FaUserCircle   } from "react-icons/fa";
import ScheduleAppointment from '../components/ScheduleAppointment';
import ProtectedMobileHeader from '../components/ProtectedMobileHeader';
import ScheduledConsultation from '../components/ScheduledConsultation';
import UpdateProfile from '../components/UpdateProfile';
import { SectionsObjType } from '@/utils/types';
import useGlobalStore from '@/utils/globalStorage';
import { useMedia } from 'use-media';
import toast, { Toaster } from 'react-hot-toast';
import { useDataFromDB } from '@/firebase/databaseCRUDFunctions';
import { useAuth } from '@/firebase/authContext';
import { areAllFieldsRequired } from '@/utils/functions/profileFormValidation';

export default function Agendamento() {

    const { userAuth } = useAuth();
    const { data: userProfileData } = useDataFromDB({ 
        route: 'users/' + userAuth?.uid + '/profile', 
        queryKey: 'user-profile-data' 
    });
    const isMediumMobile = useMedia({maxWidth: '1024px'});
    const { 
        isAppointmentScheduled, cameFromSignUp, isFirstLogin, sectionNumber, setIsUserProfileDBFilled, isUserProfileDBFilled
    } = useGlobalStore();
    const [section, setSecion] = useState<React.ReactElement | null>(<ScheduleAppointment/>);
    const [selectedStep, setSelectedStep] = useState<number>(1);

    const handleSection = useCallback((sectionNumberLargeScreen: number) => {

        const sections: SectionsObjType = {
            1: <ScheduleAppointment/>,
            2: <ScheduledConsultation/>,
            3: <UpdateProfile/>,
        }
        
        if(userProfileData && !isUserProfileDBFilled) {
            setSelectedStep(3);
            setSecion(sections[3]);
            toast('Preeencha todos os campos!', { style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }, });
            return;
        }

        if(isMediumMobile){
            setSelectedStep(sectionNumber);
            setSecion(sections[sectionNumber]);
            //console.log('É mobile, dentro de handleSection e setou a section', sectionNumber);
        }
        else {
            setSelectedStep(sectionNumberLargeScreen);
            setSecion(sections[sectionNumberLargeScreen]);
            
        }
  
    }, [userProfileData, isUserProfileDBFilled, isMediumMobile, sectionNumber]);

    useEffect(() => {
        if(!userProfileData) return;
         
        const requiredFields = ['name', 'email', 'cpf', 'street', 'neighborhood', 'cityState', 'cellphone'];
        const allFieldsFilled = areAllFieldsRequired(userProfileData, requiredFields);
        if(allFieldsFilled) {
            setIsUserProfileDBFilled(true);
    
        }
        else {
            setIsUserProfileDBFilled(false);
        }
    }, [setIsUserProfileDBFilled, userProfileData])

    useEffect(() => {
        
        if(isMediumMobile){
            if(isAppointmentScheduled) {
                setSelectedStep(2);
                setSecion(<ScheduledConsultation />);
                toast.success('Consulta agendada!')
                return;
            }
            // evita primeiro rendering
            else if(sectionNumber !== 0) {
                //console.log('SectionNumber diferente de 0')
                handleSection(sectionNumber);
            }
        }
    }, [handleSection, sectionNumber, isMediumMobile])

    /* Se veio do signup seta pra UpdateProfile */
    useEffect(() => {
        if(cameFromSignUp) {
            setSelectedStep(3);
            setSecion(<UpdateProfile/>);
            return;
        }
    }, [cameFromSignUp, isFirstLogin, isUserProfileDBFilled]);


    /* Quando o appointment estiver marcado levar pra ScheduledAppointment*/
    useEffect(() => {
        if(isAppointmentScheduled && isMediumMobile) {
            toast.success('Consulta agendada!')
            setSelectedStep(2);
            setSecion(<ScheduledConsultation />);
        }
        if(isAppointmentScheduled && !isMediumMobile) {
            const waitInterval = setTimeout(() => { 
                toast.success('Consulta agendada!')
                setSelectedStep(2);
                setSecion(<ScheduledConsultation />);
            }, 500);

            return () => clearTimeout(waitInterval); 
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAppointmentScheduled, isMediumMobile]);

    return (
        <ProtectedRoute>
            <main>
                <Toaster
                    position="top-center"
                    reverseOrder={false}
                />
                <div className="hidden xl:block">
                    <Header/>
                </div>
                <div className="xl:hidden">
                    <ProtectedMobileHeader/>
                </div>
                <div className='w-full h-full min-h-[calc(100vh-4.5rem)] flex items-start bg-white '>
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
                                        className={`w-full px-5 py-3 flex items-center gap-2 font-medium text-lg hover:bg-bluePrimary cursor-pointer transform ease-in-out duration-200 ${selectedStep === 3 && 'selected-option'}`}>
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
                </div>
            </main>
        </ProtectedRoute>
    )
}
