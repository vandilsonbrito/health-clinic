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

                const itWasDeleted = await deleteDBData({ route: `users/${userId}/appointments/${appointmentId}` });
                if (itWasDeleted === 'Data removed successfully') {
                    setIsCancelAppointmentBtnClicked(false);
                    setShowDeleteAppointmentMessage(false);
                    setRemoveSelectedAppointment([]);
                    setRespondedValueModalAppointmentCancel(false);
                }
            }
        };
    
        deleteAppointment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                className={`btn w-60 font-semibold ${(isCancelAppointmentBtnClicked || removeSelectedAppointment.length > 0) ? 'bg-red-600 hover:bg-red-600' : 'bg-bluePrimary hover:bg-bluePrimary'} hover:shadow-2xl  `}
            >   
                Cancelar Consulta
                <CancelAppointmentModal />
            </Button>
        </div>
    )
}
