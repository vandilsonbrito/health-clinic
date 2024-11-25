'use client';
import React, { useEffect } from 'react';
import { useDataFromDB } from '@/firebase/databaseCRUDFunctions';
import useGlobalStore from '../../../utils/globalStorage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
  

export default function AvailableDate() {

    const { 
        addDate, removeDate, selectedEspeciality, selectedDate, setJumpToScheduleAppointmentNextStep, isReadyToChooseDate
    } = useGlobalStore();
    
    const formattedName: string = selectedEspeciality[0]?.toLowerCase().replaceAll(' ', '-');
    const formattedespeciality: string = selectedEspeciality[1]?.toLowerCase();
    const { data: specialistsAgendaData, refetch } = useDataFromDB({route: `services/consultation/${formattedespeciality}/${formattedName}`, queryKey: 'especiality-agenda-data' });

    useEffect(() => {
        setJumpToScheduleAppointmentNextStep(false);
    }, [setJumpToScheduleAppointmentNextStep]);

    const handleDateClick = (value: string) => {
        const [date, time] = value.split('-');

        if(selectedDate.length > 0){
            selectedDate.forEach((item) => {
                removeDate([item]);
            });
        };
        addDate([date, time]);
        setJumpToScheduleAppointmentNextStep(true);
    }

    const displayAgenda = () => {
        const arrOptionDates: React.JSX.Element[] = [];
        if(specialistsAgendaData) {
            specialistsAgendaData?.agenda?.date?.map((date: string, index: number) => {
                arrOptionDates.push(
                    <SelectItem key={index} value={`${date}-${specialistsAgendaData.agenda.time[index]}`}>
                        {date} - {specialistsAgendaData.agenda.time[index]} h
                    </SelectItem>
                )
            })
        }
        return arrOptionDates;
    };

    useEffect(() => {
        if(isReadyToChooseDate) {
            refetch()
        }
    }, [specialistsAgendaData, isReadyToChooseDate])

    return (
        <div className='w-full h-full flex flex-col gap-4 sm:px-3 availableDate'>
            <div>
                <h2 className='font-medium mt-1'>Datas Disponíveis</h2>
                {/* <p className='text-[.7rem]'>* Selecione uma data</p> */}
            </div>
    
            <div className="flex flex-col items-center lg:flex-row gap-1">
                <form className='w-full h-full flex flex-col items-start gap-8'>
                    <Select 
                        onValueChange={(value) => handleDateClick(value)} 
                        value={selectedDate.length > 0 ? `${selectedDate[0]}-${selectedDate[1]}` 
                        : ''}
                        disabled={!isReadyToChooseDate || !specialistsAgendaData}
                        >
                        <SelectTrigger className="w-full md:w-1/2">
                            <SelectValue className='text-[.7rem]' placeholder="* Selecione uma data" />
                        </SelectTrigger>
                        <SelectContent>
                            {displayAgenda()}
                        </SelectContent>
                    </Select>
                </form>

            </div>
                
        </div>
    )
}
