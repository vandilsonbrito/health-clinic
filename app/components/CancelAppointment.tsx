import React from 'react';
import CancelAppointmentModal from './CancelAppointmentModal';
import { Button } from '@/components/ui/button';
import useGlobalStore from '@/utils/globalStorage';

export default function CancelAppointment({ appointmentIds }: { appointmentIds: string[]}) {

    const { setIsCancelAppointmentModalOpen } = useGlobalStore();

    return (
        <div>
            <Button
                onClick={() => setIsCancelAppointmentModalOpen(true)}
                className='btn w-60 font-semibold bg-red-600 hover:shadow-2xl hover:bg-red-600 '
            >   
                Cancelar Consulta
                <CancelAppointmentModal />
            </Button>
            {/* Criar opção de escolher qual consulta cancelar se tiver mais de uma */}
            {/* AO CANCELAR A CONSULTA COLOCAR EFEITO DE LOADING E DEPOIS CONFIRMAÇÃO OU ERRO AO CANCELAR */}
        </div>
    )
}
