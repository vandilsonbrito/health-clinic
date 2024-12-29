import React from 'react'
import { OverviewAppointmentInfo } from '../AppointmentInfo'

export default function AppointmentList() {
  return (
    <div className="w-[22rem] h-[22rem] mt-5 p-5 rounded-md border-2 border-slate-200 overflow-y-auto">
        <p className='text-lg font-medium text-center text-slate-600 pb-3'>Consultas Agendadas</p>
        <div className="">
            <OverviewAppointmentInfo/>
            <OverviewAppointmentInfo/>
            <OverviewAppointmentInfo/>
            <OverviewAppointmentInfo/>
        </div>
    </div>
  )
}
