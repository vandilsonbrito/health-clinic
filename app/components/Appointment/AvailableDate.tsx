'use client';
import React, { useEffect, useState } from 'react';
import { getData } from '@/firebase/databaseFunc';
import { ProfessionalData } from '@/utils/types';
import useGlobalStore from '../../../utils/globalStorage';

export default function AvailableDate() {

    const [agendaData, setAgendaData] = useState<ProfessionalData | null>(null);
    const { addDate, removeDate, selectedEspeciality, selectedDate } = useGlobalStore();

    useEffect(() => {
        const formattedName: string = selectedEspeciality[0].toLowerCase().replaceAll(' ', '-');
        const formattedespeciality: string = selectedEspeciality[1].toLowerCase()
        console.log('Route', `services/consultation/${formattedespeciality}/${formattedName}`)

        async function fetchData() {
            const data = getData({route: `services/consultation/${formattedespeciality}/${formattedName}`});
            if(data) {
                setAgendaData(await data);
            }
        }
        fetchData();
    }, []);

    useEffect(() => {
        console.log("Agenda",  agendaData?.agenda.date);
        console.log("selectedEspeciality", selectedEspeciality);
        console.log("selectedDate", selectedDate);
    }, [agendaData, selectedEspeciality]);

    const handleDateClick = (date: string, time: string) => {
        if(selectedDate.length > 0){
            selectedDate.forEach((item) => {
                removeDate([item])
            })
        }
        addDate([date, time])
    }

    const displayAgenda = () => {
        let arrAux: React.JSX.Element[] = [], arrAux2: React.JSX.Element[] = [];
        if (agendaData) {
            agendaData.agenda.date.map((date, index) => {
                arrAux.push(
                    <tr>
                        <td>
                            <button
                                className={`${selectedDate[0] === date ? 'selected-container' : ''}`} 
                                onClick={() => handleDateClick(date, agendaData.agenda.time[index])}>{date}
                            </button>
                        </td>
                        <td>{agendaData.agenda.time[index]}</td>
                        <td className='uppercase'>{agendaData.especiality}</td>
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
        <div className='w-full h-full flex flex-col gap-4'>
            <h2 className='font-medium'>Datas Disponíveis</h2>
            <div className="flex gap-1">
                {displayAgenda()}
            </div>
        </div>
    )
}
