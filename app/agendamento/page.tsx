import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Header from '../components/Header';
import { IoHome } from "react-icons/io5";
import { FaCalendarAlt, FaCalendarCheck, FaUserCircle   } from "react-icons/fa";
import { FaRegCalendarXmark } from "react-icons/fa6";
import ScheduleAppointment from '../components/ScheduleAppointment';


export default function Agendamento() {
  return (
    <ProtectedRoute>
        <Header/>
        <main className='w-full h-full min-h-[calc(100vh-4.5rem)] flex items-start bg-white'>
            <section className="w-[20%] h-full min-h-[calc(100vh-4.5rem)] bg-blueSecundary pb-5 text-white">
                <nav className="w-full h-full flex flex-col py-8">
                    <ul className='flex flex-col gap-2'>
                        <li>
                            <button className='w-full px-5 py-3 flex items-center gap-2 font-medium text-lg hover:bg-bluePrimary cursor-pointer transform ease-in-out duration-200'>
                                <IoHome />
                                Home
                            </button>
                        </li>
                        
                        <li>
                            <button className='w-full px-5 py-3 flex items-center gap-2 font-medium text-lg hover:bg-bluePrimary cursor-pointer transform ease-in-out duration-200'>
                                <FaCalendarAlt  className='mb-1'/>
                                Marcar Consulta
                            </button>
                        </li>
                        <li>
                            <button className='w-full px-5 py-3 flex items-center gap-2 font-medium text-lg hover:bg-bluePrimary cursor-pointer transform ease-in-out duration-200'>
                                <FaCalendarCheck  className='mb-1'/>
                                Consultas Agendadas
                            </button>
                        </li>
                        <li>
                            <button className='w-full px-5 py-3 flex items-center gap-2 font-medium text-lg hover:bg-bluePrimary cursor-pointer transform ease-in-out duration-200'>
                                <FaRegCalendarXmark className='mb-[3px]'/>
                                Cancelar Consulta
                            </button>
                        </li>
                        <li>
                            <button className='w-full px-5 py-3 flex items-center gap-2 font-medium text-lg hover:bg-bluePrimary cursor-pointer transform ease-in-out duration-200'>
                                <FaUserCircle  className='mb-[3px]'/>
                                Atualizar Perfil
                            </button>
                        </li>
                    </ul>
                </nav>
            </section>
            <section className="w-[80%] h-full p-2">
                <ScheduleAppointment/>
            </section>
        </main>
    </ProtectedRoute>
  )
}
