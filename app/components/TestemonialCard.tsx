import Image, { StaticImageData } from 'next/image';
import React from 'react';
import { FaStar } from "react-icons/fa";
import { RiDoubleQuotesL, RiDoubleQuotesR  } from "react-icons/ri";


export default function TestemonialCard({ url, name, feedback }: { url: StaticImageData, name: string, feedback: string }) {
  return (
    <div className='w-[35rem] h-60 px-10 flex flex-col justify-center gap-3 '>
        <div className="flex items-center gap-3">
            <Image 
                src={url}
                alt='Foto do cliente' 
                className="w-[4.2rem] h-[4.2rem] rounded-full border-2 bg-no-repeat aspect-square "/>
            <div className="flex flex-col items-start gap-2">
                <p>{name}</p>
                <div className="flex gap-1 text-yellow-400">
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                    <FaStar />
                </div>
            </div>
        </div>
        <p className='flex'>
            {/* <RiDoubleQuotesL /> */}
                <i>{feedback}</i>
            {/* <RiDoubleQuotesR /> */}
        </p>
    </div>
  )
}
