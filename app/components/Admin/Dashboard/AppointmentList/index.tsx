import React from 'react'
import AppointmentInfo from '../AppointmentInfo'

export default function index() {
  return (
    <div className="w-[20rem] h-[22rem] mt-5 p-5 rounded-md border-2 border-slate-200 overflow-y-auto">
        <p className='text-slate-600 text-sm pb-4 font-semibold'>Lista de Consultas</p>
        <div className="">
            <AppointmentInfo/>
            <AppointmentInfo/>
            <AppointmentInfo/>
            <AppointmentInfo/>
        </div>
    </div>
  )
}
