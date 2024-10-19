import React, { useEffect, useState } from 'react';
import { FaCalendarCheck } from 'react-icons/fa';
import ModalCancelAppointment from './ModalCancelAppointment';

export default function ScheduledConsultation() {

    // Fazer consulta para consultas agendadas route 'users/appointments'
    const appointment = [{
        profissional: 'Luana Lima',
        especialidade: 'Nutrologia',
        dataAppointment: '29/11/2024 - 07:00'
    }];

    const [appointments, setAppointments] = useState()

    useEffect(() => {
        let auxArr = []; 
        const displayAppointments = () => {
            appointment.map((item) => {
                auxArr.push(
                    <tr>
                        <td>{item.dataAppointment}</td>
                        <td className='uppercase'>{item.especialidade}</td>
                        <td>{item.profissional}</td>
                    </tr>
                )
            });
            setAppointments(auxArr);
        }

        displayAppointments();
    }, [])

    return (
        <div className='w-full h-full'>
            <div className='w-full p-2 xl:p-5 mt-1 xl:mt-0 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
                <FaCalendarCheck className='text-2xl xl:text-4xl' />
                <h1>Consultas Agendadas</h1>
            </div>

            <div className="w-full h-full border flex flex-col gap-4  mt-5 p-2">
                <h2 className='font-medium'>Próxima(s) Consultas</h2>
                <table className='w-full'>
                    <tbody>
                        <tr className='bg-[#e9f1f8da]'>
                            <td>Data/Hora</td>
                            <td className='uppercase'>Especialidade</td>
                            <td>Profissional</td>
                        </tr>
                        {appointments}
                    </tbody>
                </table>
                <div className='w-full h-full flex justify-center items-center mt-2'>
                    {/* <Button
                        className='btn w-60 font-semibold bg-red-600 hover:shadow-2xl hover:bg-red-600 '
                    >Cancelar Consulta</Button> */}
                    <ModalCancelAppointment />
                </div>
            </div>

        </div>
    )
}
