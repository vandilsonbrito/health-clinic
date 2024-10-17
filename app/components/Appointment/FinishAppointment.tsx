import { Button } from '@/components/ui/button'
import useGlobalStore from '@/utils/globalStorage';
import React from 'react';
import { FaCheck } from "react-icons/fa";


export default function FinishAppointment() {

    const { selectedEspeciality, selectedDate } = useGlobalStore();

    return (
        <div className='w-full h-full flex flex-col gap-4'>
                <h2 className='font-semibold text-black'>Confirmar Agendamento</h2>
                <div className="flex flex-col gap-1">
                    <div className="flex gap-5 p-2 bg-blue-50">
                        <p className='font-medium'>Profissional:</p>
                        <p>{selectedEspeciality[0]}</p>
                    </div>
                    <div className="flex gap-5 p-2 bg-blue-50">
                        <p className='font-medium'>Especialidade:</p>
                        <p className='uppercase'>{selectedEspeciality[1]}</p>
                    </div>
                    <div className="flex gap-5 p-2 bg-blue-50">
                        <p className='font-medium'>Data da Consulta:</p>
                        <div className="flex gap-1">
                            <p>{`${selectedDate[0]} - `}</p>
                            <p>{selectedDate[1]}</p>
                        </div>
                    </div>
                </div>

                <div className="flex gap-5">
                    <Button 
                        className='bg-white text-bluePrimary border-2 border-blueSecundary hover:bg-white hover:shadow-xl font-semibold  active:scale-x-[.98]'
                        //onClick={() => setReturnToSpecialitiesAvailable(true)}
                        >
                        Voltar
                    </Button>
                    <Button 
                        className='bg-bluePrimary hover:bg-blueSecundary hover:shadow-xl font-semibold flex gap-2  active:scale-x-[.98]'
                        >
                        Confirmar Agendamento
                        <FaCheck />
                    </Button>
                </div>
            </div>
    )
};
