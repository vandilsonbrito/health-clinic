'use client';
import React, { ReactElement, useEffect, useState } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import { useGetAppointmentsDataFromDB } from '@/firebase/databaseCRUDFunctions';
import { useAuth } from '@/firebase/authContext';
import { AppointmentFormatType } from '@/utils/types';
import CancelAppointment from './CancelAppointment';
import useGlobalStore from '@/utils/globalStorage';

export default function ScheduledConsultation() {

    const { userAuth } = useAuth();
    const [userId, setUserId] = useState<string>('');
    const [appointmentsFromDB, setAppointmentsFromDB] = useState<AppointmentFormatType[]>([]);
    const [appointmentsNode, setAppointmentsNode] = useState<ReactElement[]>();
    const [appointmentIds, setAppointmentIds] = useState<string[]>([]);
    const [removeSelectedAppointmentID, setRemoveSelectedAppointmentID] = useState<string>('');
    const { showDeleteAppointmentMessage, respondedValueModalAppointmentCancel, removeSelectedAppointment, setRemoveSelectedAppointment } = useGlobalStore();

    useEffect(() => {
        if(userAuth && userAuth.uid) {
            setUserId(userAuth.uid)
        } 
    }, [userAuth])
    const { data: userAppointmentData, refetch, isLoading } = useGetAppointmentsDataFromDB({ route: `users/${userAuth?.uid}/appointments`, userID: userId });

    useEffect(() => {
        if(!respondedValueModalAppointmentCancel) return;

        refetch();
    }, [respondedValueModalAppointmentCancel])
    
    
    useEffect(() => {
        const arrAux: string[] = [];
        const arrAux2: AppointmentFormatType[] = [];
        for(const appointmentIDs in userAppointmentData) {
            arrAux.push(appointmentIDs);
            arrAux2.push(userAppointmentData[appointmentIDs][0]);
        }
        setAppointmentIds(arrAux);
        setAppointmentsFromDB(arrAux2);
        console.log("userAppointmentData", userAppointmentData)
    }, [userAppointmentData]);
/* CONSOLE.LOG */
    useEffect(() => {
        console.log("appointmentsFromDB", appointmentsFromDB)
    }, [appointmentsFromDB])
    
    const handleAppointmentClick = (date: string, time: string) => {
        if(removeSelectedAppointment.length > 0){
            setRemoveSelectedAppointment([]);
        }
        setRemoveSelectedAppointment([date, time]);
    }

    useEffect(() => {
        if(appointmentsFromDB.length > 0) {
            const auxArr: ReactElement[] = []; 
            const displayAppointments = () => {
                appointmentsFromDB.map((item: AppointmentFormatType, index: number) => {
                    auxArr.push(
                        <tr key={index} className="w-full uppercase">
                            
                            <td>
                                <button
                                    className={(removeSelectedAppointment[0] === item?.date && removeSelectedAppointment[1] === item?.time) ? 'selected-container' : ''} 
                                    onClick={() => handleAppointmentClick(item?.date, item?.time)}>
                                    {item?.date} - {item?.time}
                                </button>
                            </td>
                            <td>{item?.especiality}</td>
                            <td>{item?.professionalName}</td>
                        </tr>
                    )
                });
                setAppointmentsNode(auxArr);
            }
            displayAppointments();
        }
    }, [appointmentsFromDB, removeSelectedAppointment]);

    useEffect(() => {
        for(const appointmentIDs in userAppointmentData) {
            if(userAppointmentData[appointmentIDs][0].date === removeSelectedAppointment[0] && userAppointmentData[appointmentIDs][0].time === removeSelectedAppointment[1]) {
                setRemoveSelectedAppointmentID(appointmentIDs);
            }
        }
    }, [userAppointmentData, appointmentIds, removeSelectedAppointment])

    return (
        <div className='w-full h-full'>
            <div className='w-full p-2 xl:p-5 mt-1 xl:mt-0 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
                <FaCalendarCheck className='text-2xl xl:text-4xl' />
                <h1>Consultas Agendadas</h1>
            </div>

            <div className="w-full h-full border flex flex-col gap-4  mt-5 p-2">
                <h2 className='font-medium'>Próxima(s) Consultas</h2>
                { showDeleteAppointmentMessage && <p className='text-[.7rem]'>*Selecione Data/Horário para cancelar</p> }
               
                {   
                    isLoading ? 
                    (
                        <div className="w-full h-full min-h-[13rem] flex flex-col justify-center items-center">
                            <p className='text-lg mb-4'>Loading</p>
                            <span className="loader"></span>
                        </div> 
                    )
                    :
                        appointmentsFromDB.length > 0 ?
                            (
                                <div className="w-full h-full max-h-[calc(100vh-333px)] overflow-y-auto">
                                    <table className='w-full h-full'>
                                        <thead className='bg-[#e9f1f8da] font-semibold uppercase'>
                                            <tr>
                                                <td className='text-center'>Data/Hora</td>
                                                <td className='text-center'>Profissional</td>
                                                <td className='text-center'>Especialidade</td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {appointmentsNode}  
                                        </tbody>
                                    </table>
                                </div>
                            )
                            :
                            (
                                <div className="w-full h-full min-h-[13rem] flex flex-col justify-center items-center">
                                    <p className=''>Você ainda não tem consultas agendadas.</p>
                                </div>
                            )    
                }
                
                <div className={appointmentsFromDB.length > 0 ? `w-full h-full flex justify-center items-center mt-2` : 'hidden'}>
                    <CancelAppointment appointmentId={removeSelectedAppointmentID} userId={userId}
                    />
                </div>
            </div>

        </div>
    )
}
