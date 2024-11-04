'use client';
import React, { useEffect } from 'react';
import CancelAppointmentModal from './CancelAppointmentModal';
import { Button } from '@/components/ui/button';
import useGlobalStore from '@/utils/globalStorage';
import { deleteDBData } from '@/firebase/databaseCRUDFunctions';

export default function CancelAppointment({ appointmentId, userId }: { appointmentId: string, userId: string }) {

    const { 
        setIsCancelAppointmentModalOpen, isCancelAppointmentBtnClicked, setIsCancelAppointmentBtnClicked, respondedValueModalAppointmentCancel, setShowDeleteAppointmentMessage, removeSelectedAppointment, setRemoveSelectedAppointment, setRespondedValueModalAppointmentCancel
    } = useGlobalStore();

    useEffect(() => {
        const deleteAppointment = async () => {
            if (respondedValueModalAppointmentCancel) {
                console.log("Route", `users/${userId}/appointments/${appointmentId}`);
                const itWasDeleted = await deleteDBData({ route: `users/${userId}/appointments/${appointmentId}` });
                // Pegar retorno da função para acabar com efeito de loading quando retornar sucesso
                if (itWasDeleted === 'Data removed successfully') {
                    setIsCancelAppointmentBtnClicked(false);
                    setShowDeleteAppointmentMessage(false);
                    setRemoveSelectedAppointment([]);
                    setRespondedValueModalAppointmentCancel(false);
                }
            }
        };
    
        deleteAppointment();
    }, [respondedValueModalAppointmentCancel]);


    const handleCancelAppointmentBtn = () => {
        if(removeSelectedAppointment.length === 0) {
            setIsCancelAppointmentBtnClicked(true);
            setShowDeleteAppointmentMessage(true);
        }
        else {
            setIsCancelAppointmentModalOpen(true);
        }
    }

    return (
        <div>
            <Button
                onClick={() => handleCancelAppointmentBtn()}
                className={`btn w-60 font-semibold ${isCancelAppointmentBtnClicked ? 'bg-red-600 hover:bg-red-600' : 'bg-bluePrimary hover:bg-bluePrimary'} hover:shadow-2xl  `}
            >   
                Cancelar Consulta
                <CancelAppointmentModal />
            </Button>
            {/* Criar opção de escolher qual consulta cancelar se tiver mais de uma */}
            {/* AO CANCELAR A CONSULTA COLOCAR EFEITO DE LOADING E DEPOIS CONFIRMAÇÃO OU ERRO AO CANCELAR */}
        </div>
    )
}
