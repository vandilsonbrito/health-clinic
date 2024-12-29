import React from 'react'

export function OverviewAppointmentInfo() {
  return (
    <div className='w-full h-full border-slate-200 border-b-[1px] flex items-center justify-between'>
        <div className="flex flex-col">
            <p className='text-[.8rem] text-slate-600 font-medium'>Marcos Augusto</p>   
            <p className='text-[.7rem] text-slate-500'>Oftalmologista</p>
        </div>
        <div className="flex flex-col">
            <p className='text-[.7rem] text-slate-500'>Hoje</p>
            <p className='text-[.78rem] font-medium text-slate-600'>15:00</p>
        </div>
    </div>
  )
}
export function AppointmentInfo() {
  return (
    <div className='w-full h-full border-slate-200 border-b-[1px] flex items-center justify-between'>
        <div className="flex flex-col">
            <p className='text-[1rem] text-slate-600 font-medium'>Marcos Augusto</p>   
            <p className='text-[.9rem] text-slate-500'>Oftalmologista</p>
        </div>
        <div className="flex flex-col">
            <p className='text-[.9rem] text-slate-500'>Hoje</p>
            <p className='text-[1rem] font-medium text-slate-600'>15:00</p>
        </div>
    </div>
  )
}
