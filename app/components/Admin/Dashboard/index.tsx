import React from 'react'
import HeaderCard from './HeaderCard'
import { BsFillPeopleFill } from 'react-icons/bs'
import { PiCalendarDotFill } from "react-icons/pi";
import OverviewChart from './OverviewGraph';
import AppointmentList from './OverviewAppointmentList';


export default function Dashboard() {
  return (
    <main className='w-full h-full flex flex-col items-center justify-center gap-7'>
        <div className='w-full p-2 xl:p-5 mt-1 xl:mt-0 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
            <BsFillPeopleFill className='text-2xl xl:text-4xl' />
            <h1>Dashboard</h1>
        </div>
        <div className="w-full h-full border-[1px] border-slate-200 p-8 flex flex-col justify-center items-center">
            <div className="w-full h-full flex items-center justify-center gap-5">
                <HeaderCard
                    icon={<PiCalendarDotFill className="text-slate-600"/>}
                    title={'Consultas Marcadas Para Hoje'}
                    amount={16}
                />
                <HeaderCard
                    icon={<BsFillPeopleFill className="text-slate-600"/>}
                    title={'Total de Pacientes Cadastrados'}
                    amount={478}
                />
            </div>
            <div className="flex items-center justify-center gap-20">
                <div className="w-[38rem] h-[20rem] p-5 rounded-md border-2 border-slate-200">
                    <OverviewChart/>
                </div>
                <AppointmentList/>
            </div>
        </div>
    </main>
  )
}
