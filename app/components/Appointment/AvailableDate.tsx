'use client';
import React, { useEffect } from 'react';
import { useDataFromDB } from '@/firebase/databaseCRUDFunctions';
import useGlobalStore from '../../../utils/globalStorage';

export default function AvailableDate() {

    const { addDate, removeDate, selectedEspeciality, selectedDate, setJumpToScheduleAppointmentNextStep } = useGlobalStore();
    
    const formattedName: string = selectedEspeciality[0].toLowerCase().replaceAll(' ', '-');
    const formattedespeciality: string = selectedEspeciality[1].toLowerCase();
    const { data: specialistsAgendaData } = useDataFromDB({route: `services/consultation/${formattedespeciality}/${formattedName}`, queryKey: 'especiality-agenda-data' });

    useEffect(() => {
        setJumpToScheduleAppointmentNextStep(false);
    }, [setJumpToScheduleAppointmentNextStep]);

    const handleDateClick = (date: string, time: string) => {
        if(selectedDate.length > 0){
            selectedDate.forEach((item) => {
                removeDate([item])
            })
        }
        addDate([date, time]);
        setJumpToScheduleAppointmentNextStep(true);
    }

    const displayAgenda = () => {
        let arrAux: React.JSX.Element[] = [];
        const arrAux2: React.JSX.Element[] = [];
        if (specialistsAgendaData) {
            specialistsAgendaData?.agenda?.date?.map((date: string, index: number) => {
                arrAux.push(
                    <tr key={index}>
                        <td>
                            <button
                                className={`${selectedDate[0] === date ? 'selected-container' : ''}`} 
                                onClick={() => handleDateClick(date, specialistsAgendaData.agenda.time[index])}>{date}
                            </button>
                        </td>
                        <td>{specialistsAgendaData.agenda.time[index]}</td>
                        <td className='uppercase'>{specialistsAgendaData.especiality}</td>
                    </tr>
                )
                if(arrAux.length > 3) {
                    arrAux2.push(
                        <table className='w-1/2' key={index}>
                            <tbody>
                                {arrAux}
                            </tbody>
                        </table>
                    );
                    arrAux = [];
                }
            })
        }
        console.log("ArrAux2", arrAux2);
        return arrAux2;
    };


    return (
        <div className='w-full h-full flex flex-col gap-4  availableDate'>
            <div>
                <h2 className='font-medium mt-1'>Datas Disponíveis</h2>
                <p className='text-[.7rem]'>* Selecione uma data</p>
            </div>
            {
                specialistsAgendaData ?
                (
                    <div className="flex flex-col items-center lg:flex-row gap-1">
                        {displayAgenda()}
                    </div>
                )
                :
                (   
                    <div className="w-full h-full min-h-[10rem] flex flex-col justify-center items-center">
                        <p className='text-lg mb-4'>Loading</p>
                        <span className="loader"></span>
                    </div>
                )
            }
        </div>
    )
}
