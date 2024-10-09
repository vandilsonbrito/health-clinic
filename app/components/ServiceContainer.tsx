import React from 'react';

export default function ServiceContainer({ icon, title }: { icon: React.ReactNode, title: string }) {
  return (
    <div data-aos="fade-up">
        <div className="w-[300px] h-[230px] bg-gradient-to-r from-bluePrimary to-[#1d70bd] rounded-3xl flex flex-col justify-center items-center gap-4 shadow-lg">
            <div className="flex flex-col items-center justify-center p-3 rounded-full bg-white text-bluePrimary text-4xl">
                {icon}
            </div>
            <h3 className='text-[1.7rem] font-semibold text-white'>{title}</h3>    
        </div>
    </div>
  )
}
