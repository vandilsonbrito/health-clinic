import Image, { StaticImageData } from 'next/image'
import React from 'react'

export default function CarouselAppointContainer({ url, title }: { url: StaticImageData, title: string }) {
  return (
    <button className="w-40 p-2 py-5 rounded-3xl flex flex-col justify-center items-center gap-1 bg-blue-50 hover:bg-blue-100 transform ease-in-out duration-200 text-black text-4xl border">
        <div className="flex flex-col items-center justify-center rounded-full bg-white ">
            <Image 
              className='rounded-full'
              src={url} 
              alt='Profissional Image' 
              width={100} 
              height={100}
              />
        </div>
        <h3 className='text-[1rem] font-medium '>{title}</h3>    
    </button> 
  )
}
