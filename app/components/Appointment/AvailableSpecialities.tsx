'use client';
import React, { useEffect, useState } from 'react';
import { useDataFromDB } from '@/firebase/databaseCRUDFunctions';
import useGlobalStore from '@/utils/globalStorage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from 'next/image';
import medico1 from '../../../public/medico1.jpg';
import medico2 from '../../../public/medico2.jpg';
import medico3 from '../../../public/medico3.jpg';
import medica1 from '../../../public/medica1.jpg';
import medica2 from '../../../public/medica2.jpg';

const professionalsImages = [medico1, medica1, medico2, medica2, medico3, medico1, medico2, medica1, medica2, medico3, medica2, medica1];

export default function AvailableSpecialities() {

    const { data: specialistsData } = useDataFromDB({route: 'services/consultation', queryKey: 'especiality-services-data' });
    const { 
        addEspeciality, removeEspeciality, selectedEspeciality, selectedDate, removeDate  
    } = useGlobalStore();
    const [especiality, setEspeciality] = useState<string[]>([]);
    const [professionalsName, setProfessionalsName] = useState<string[]>([]);
    

    useEffect(() => {
        function fetchData() {
            if(specialistsData) {
                const auxArr: string[] = [], auxArr2: string[] = [];

                for(const especiality in specialistsData) {
                    for(const professional in specialistsData[especiality]) {
                        auxArr.push(specialistsData[especiality][professional].especiality);
                        auxArr2.push(specialistsData[especiality][professional].name);
                    }
                }

                setEspeciality(auxArr);   
                setProfessionalsName(auxArr2);
            }
        }  
        fetchData();

    }, [specialistsData]);

    const handleProfessionalChoose = (value: string) => {
        let [professionalName, especiality1] = value.split('-');

        professionalName = professionalName?.trim();
        especiality1 = especiality1?.trim();
        //console.log("value", value);

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
        //console.log("selectedEspeciality", selectedEspeciality)
        addEspeciality([professionalName, especiality1]);
        
    }

    useEffect(() => {
        //console.log("selectedEspeciality", selectedEspeciality)
    }, [selectedEspeciality])
    
    return (
        <div className="flex flex-col gap-2  available-specialists">
            <div>
                <h2 className='font-medium'>Especialidades Disponíveis</h2>
            </div>
            <div className="slider-container px-0 py-3 sm:px-3 pb-0 gap-2">
                {
                    especiality && especiality.length > 0 ?
                    (   
                        <form className='w-full h-full flex flex-col items-start gap-8'>
                            <Select 
                                onValueChange={(value) => handleProfessionalChoose(value)} 
                                value={selectedEspeciality.length > 0 ? `${selectedEspeciality[0]}-${selectedEspeciality[1]}` : '' }

                                >
                                <SelectTrigger className="w-full md:w-1/2 h-full min-h-16">
                                    <SelectValue className='text-[.7rem]' placeholder="* Selecione uma especialidade" />
                                </SelectTrigger>
                                <SelectContent>
                                {
                                    especiality?.map((item, index) => {
                                        return (
                                            <SelectItem key={index} value={`${professionalsName[index]}-${item}`} >
                                                <div className='w-full flex gap-5 items-center'>
                                                    <Image
                                                        className='rounded-full'
                                                        src={professionalsImages[index]}
                                                        alt='Profissional Image'
                                                        width={50}
                                                        height={50}
                                                    />
                                                    
                                                    <div className="flex flex-col gap-1">
                                                        <p className='text-sm font-medium '>{professionalsName[index]}</p>
                                                        <h3 className='text-[1rem] font-medium '>{item}</h3>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        )
                                    })
                                } 
                                
                                    
                                </SelectContent>
                            </Select>
                        </form>
                    )
                    :
                    (
                        <div className="w-full h-full min-h-[13rem] flex flex-col justify-center items-center">
                            <p className='text-lg mb-4'>Loading</p>
                            <span className="loader"></span>
                        </div> 
                    )
                }
                   
            </div>
        </div>
    )
}
