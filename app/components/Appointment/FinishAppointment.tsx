import { Button } from '@/components/ui/button'
import { addDataToDB } from '@/firebase/databaseFunc';
import useGlobalStore from '@/utils/globalStorage';
import { AppointmentFormatType } from '@/utils/types';
import React, { useEffect, useState } from 'react';
import { FaCheck } from "react-icons/fa";
import { useAuth } from '@/firebase/authContext';

export default function FinishAppointment() {

    const { userAuth } = useAuth();
    const { selectedEspeciality, removeEspeciality, selectedDate, removeDate, setReturnToScheduleAppointmentFirstStep, setIsAppointmentScheduled } = useGlobalStore();
    const [formatAppointmentData, setFormatAppointmentData] = useState<AppointmentFormatType>()

    useEffect(() => {
        setIsAppointmentScheduled(false);
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
    }, [selectedEspeciality, selectedDate, setIsAppointmentScheduled])

    const setAppointmentToDB = (dataToAddToDB: AppointmentFormatType, userUid: string) => {
        addDataToDB({ route: `users/${userUid}/appointments`, data: [dataToAddToDB] });

        setIsAppointmentScheduled(true);
        selectedDate.forEach((item) => { removeDate([item]) });
        selectedEspeciality.forEach((item) => { removeEspeciality([item]) });
        
    };
    console.log("formatAppointmentData", formatAppointmentData)
    
    return (
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

                <div className="flex gap-5">
                    <Button 
                        className='bg-white text-bluePrimary border-2 border-blueSecundary hover:bg-white hover:shadow-xl font-semibold  active:scale-x-[.98]'
                        onClick={() => setReturnToScheduleAppointmentFirstStep(true)}
                        >
                        Voltar
                    </Button>
                    <Button 
                        onClick={() => (formatAppointmentData && userAuth?.uid) && setAppointmentToDB(formatAppointmentData, userAuth.uid)}
                        className='bg-bluePrimary hover:bg-blueSecundary hover:shadow-xl font-semibold flex gap-2  active:scale-x-[.98]'
                        >
                        Confirmar Agendamento
                        <FaCheck />
                    </Button>
                </div>
            </div>
    )
};
