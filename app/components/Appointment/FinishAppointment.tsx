import { Button } from '@/components/ui/button'
import { addDataToDB, useDataFromDB } from '@/firebase/databaseCRUDFunctions';
import useGlobalStore from '@/utils/globalStorage';
import { AppointmentFormatType } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { useAuth } from '@/firebase/authContext';
import toast, { Toaster } from 'react-hot-toast';

export default function FinishAppointment() {

    const { userAuth } = useAuth();
    const { 
        selectedEspeciality, removeEspeciality, selectedDate, removeDate, setReturnToScheduleAppointmentFirstStep, setIsAppointmentScheduled, isUserProfileDBFilled
    } = useGlobalStore();
    const [formatAppointmentData, setFormatAppointmentData] = useState<AppointmentFormatType>();
    const { data: userProfileData } = useDataFromDB({route: 'users/' + userAuth?.uid + '/profile', queryKey: 'user-profile-data' });

    useEffect(() => {
        if(selectedEspeciality.length > 0 && selectedDate.length > 0 ) {
            setFormatAppointmentData(
                {   
                    especiality: selectedEspeciality[0],
                    professionalName: selectedEspeciality[1],
                    date: selectedDate[0],
                    time: selectedDate[1]
                }
            )
        }   
    }, [selectedEspeciality, selectedDate]);

    useEffect(() => {
        if(!userProfileData) return;

        if(!isUserProfileDBFilled) {
            toast('Atualize seu Perfil!', { style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }, });
        }
    }, [isUserProfileDBFilled, userProfileData]);


    const setAppointmentToDB = async () => {
        if(!formatAppointmentData || !userAuth?.uid) return;

        if(!isUserProfileDBFilled) {
            toast('Atualize seu Perfil!', { style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
            }, });
            return;
        }

        const itWasAdded = await addDataToDB({ route: `users/${userAuth.uid}/appointments`, data: [formatAppointmentData] });

        if(itWasAdded === "Saved data successfully") {
            setIsAppointmentScheduled(true);  
            selectedDate.forEach((item: string) => { removeDate([item]) });
            selectedEspeciality.forEach((item: string) => { removeEspeciality([item]) });
        }
    };
  
    
    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className='w-full h-full flex flex-col gap-4'>
                    <h2 className='font-semibold text-black'>Confirmar Agendamento</h2>
                    <div className="flex flex-col gap-1">
                        <div className="flex gap-5 p-2 bg-blue-50">
                            <p className='font-medium'>Profissional:</p>
                            <p>{formatAppointmentData?.especiality}</p>
                        </div>
                        <div className="flex gap-5 p-2 bg-blue-50">
                            <p className='font-medium'>Especialidade:</p>
                            <p className='uppercase'>{formatAppointmentData?.professionalName}</p>
                        </div>
                        <div className="flex gap-5 p-2 bg-blue-50">
                            <p className='font-medium'>Data da Consulta:</p>
                            <div className="flex gap-1">
                                <p>{`${formatAppointmentData?.date} - `}</p>
                                <p>{formatAppointmentData?.time}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-5 mt-5">
                        <Button 
                            className='bg-white text-bluePrimary border-2 border-blueSecundary hover:bg-white hover:shadow-xl font-semibold  active:scale-x-[.98]'
                            onClick={() => setReturnToScheduleAppointmentFirstStep(true)}
                            >
                            Voltar
                        </Button>
                        <Button 
                            onClick={() => setAppointmentToDB()}
                            className='bg-bluePrimary hover:bg-blueSecundary hover:shadow-xl font-semibold flex gap-2  active:scale-x-[.98]'
                            >
                            Confirmar Agendamento
                            <FaCheck />
                        </Button>
                    </div>
            </div>
        </>
    )
};
