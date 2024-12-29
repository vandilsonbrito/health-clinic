import React from 'react'
import { AppointmentInfo } from '../AppointmentInfo'
import { FaCalendarCheck } from 'react-icons/fa'

export default function AppointmentList() {
  return (
    <main className='w-full h-full flex flex-col items-center justify-center'>
      <div className='w-full p-2 xl:p-5 mt-1 xl:mt-0 flex items-center justify-center gap-4 font-medium text-2xl bg-blue-100 text-blueSecundary'>
          <FaCalendarCheck className='text-2xl xl:text-4xl' />
          <h1>Consultas Agendadas</h1>
      </div>
      <div className="w-full h-full flex items-center justify-center p-5 mt-5 border-[1px] border-[#e9f1f8da]">
        <div className="w-[35rem] h-[22rem] mt-5 p-10 rounded-md border-2 border-slate-200 overflow-y-auto">
            <div className="">
                <AppointmentInfo/>
                <AppointmentInfo/>
                <AppointmentInfo/>
                <AppointmentInfo/>
            </div>
        </div>
      </div>
    </main>
  )
}
