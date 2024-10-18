import useGlobalStore from '@/utils/globalStorage';
import Image, { StaticImageData } from 'next/image'
import React from 'react'

export default function CarouselAppointContainer({ url, especiality, professionalName }: { url: StaticImageData, especiality: string, professionalName: string }) {

    const { addEspeciality, removeEspeciality, selectedEspeciality, selectedDate, removeDate } = useGlobalStore();

    const handleChooseProfessional = () => {
      if(selectedEspeciality.length > 0){
        selectedEspeciality.forEach((item) => {
          removeEspeciality([item])
        })
      }
      if(selectedDate.length > 0){
        selectedDate.forEach((item) => {
            removeDate([item])
        })
      }
      addEspeciality([professionalName, especiality])
    }
  
    return (
        <button 
          onClick={() => handleChooseProfessional()}
          className={`w-40 p-2 py-5 rounded-3xl flex flex-col justify-center items-center gap-1 bg-[#f9fbff] hover:bg-blue-100 transform ease-in-out duration-200 text-black text-4xl border ${selectedEspeciality[0] === professionalName ? 'selected-container hover:bg-bluePrimary' : ''}`}
          >
            <div className="flex flex-col items-center justify-center rounded-full bg-white ">
                <Image 
                  className='rounded-full'
                  src={url} 
                  alt='Profissional Image' 
                  width={100} 
                  height={100}
                  />
            </div>
            <div className="flex flex-col gap-1">
              <p className='text-sm font-medium '>{professionalName}</p>
              <h3 className='text-[1rem] font-medium '>{especiality}</h3>
            </div>    
        </button> 
    )
}
