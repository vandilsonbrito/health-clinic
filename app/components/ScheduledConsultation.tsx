import React, { ReactElement, Suspense, useEffect, useState } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import CancelAppointmentModal from './CancelAppointmentModal';
import { Button } from '@/components/ui/button';
import useGlobalStore from '@/utils/globalStorage';
import { useGetAppointmentsDataFromDB } from '@/firebase/databaseFunc';
import { useAuth } from '@/firebase/authContext';
import { AppointmentFormatType } from '@/utils/types';

export default function ScheduledConsultation() {

    const { userAuth } = useAuth();
    const [userId, setUserId] = useState<string>('');
    const [appointmentsFromDB, setAppointmentsFromDB] = useState<AppointmentFormatType[]>([]);
    useEffect(() => {
        if(userAuth && userAuth.uid) {
            setUserId(userAuth.uid)
        } 
    }, [userAuth?.uid])
    const { data: userAppointmentData } = useGetAppointmentsDataFromDB({ route: `users/${userAuth?.uid}/appointments`, userID: userId });
    
    useEffect(() => {
        const arrAux = []
        for(const appointmentIDs in userAppointmentData) {
            arrAux.push(userAppointmentData[appointmentIDs][0])
        }
        setAppointmentsFromDB(arrAux)
        console.log("userAppointmentData", userAppointmentData)
    }, [userAppointmentData]);

    useEffect(() => {
        console.log("appointmentsFromDB", appointmentsFromDB)
    }, [appointmentsFromDB])


    const [appointmentsNode, setAppointmentsNode] = useState<ReactElement[]>();
    const { setIsCancelAppointmentModalOpen } = useGlobalStore();

    useEffect(() => {
        if(appointmentsFromDB.length > 0) {
            const auxArr: ReactElement[] = []; 
            const displayAppointments = () => {
                appointmentsFromDB.map((item: AppointmentFormatType, index: number) => {
                    auxArr.push(
                        <tr key={index} className="w-full uppercase">
                            <td>{`${item?.date} - ${item?.time}`}</td>
                            <td>{item?.especiality}</td>
                            <td>{item?.professionalName}</td>
                        </tr>
                    )
                });
                setAppointmentsNode(auxArr);
            }
            displayAppointments();
        }
    }, [appointmentsFromDB])

    return (
        <div className='w-full h-full'>
            <div className='w-full p-2 xl:p-5 mt-1 xl:mt-0 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
                <FaCalendarCheck className='text-2xl xl:text-4xl' />
                <h1>Consultas Agendadas</h1>
            </div>

            <div className="w-full h-full border flex flex-col gap-4  mt-5 p-2">
                <h2 className='font-medium'>Próxima(s) Consultas</h2>
                <Suspense fallback={
                    <div className="w-full h-full min-h-[13rem] flex flex-col justify-center items-center">
                            <p className='text-lg mb-4'>Loading</p>
                            <span className="loader"></span>
                        </div> } >
                    {
                        appointmentsFromDB.length > 0 &&
                        (
                            <div className="w-full h-full max-h-[calc(100vh-300px)] overflow-y-auto">
                                <table className='w-full h-full'>
                                    <thead>
                                        <tr className='bg-[#e9f1f8da]'>
                                            <td className='uppercase text-center'>Data/Hora</td>
                                            <td className='uppercase text-center'>Especialidade</td>
                                            <td className='uppercase text-center'>Profissional</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {appointmentsNode}  
                                    </tbody>
                                </table>
                            </div>
                        )
                    }
                </Suspense>
                <div className='w-full h-full flex justify-center items-center mt-2'>
                    <Button
                        onClick={() => setIsCancelAppointmentModalOpen(true)}
                        className='btn w-60 font-semibold bg-red-600 hover:shadow-2xl hover:bg-red-600 '
                    >   
                        Cancelar Consulta
                        <CancelAppointmentModal />
                    </Button>
                    {/* AO CANCELAR A CONSULTA COLOCAR EFEITO DE LOADING E DEPOIS CONFIRMAÇÃO OU ERRO AO CANCELAR */}
                </div>
            </div>

        </div>
    )
}
