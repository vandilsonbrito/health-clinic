import { create } from 'zustand';
import { selectedConsultationType } from './types';

export type State = {
    selectedConsultation: selectedConsultationType[]
    selectedEspeciality: string[]
    selectedDate: string[],
    returnToFirstStep: boolean
    jumpToNextStep: boolean, 
    isCancelAppointmentModalOpen: boolean
};

export type Action = {
    addConsultation: (selectedConsultation: State['selectedConsultation']) => void,
    removeConsultation: (selectedConsultation: State['selectedConsultation']) => void,
    addEspeciality: (selectedEspeciality: State['selectedEspeciality']) => void,
    removeEspeciality: (selectedEspeciality: State['selectedEspeciality']) => void,
    addDate: (selectedDate: State['selectedDate']) => void,
    removeDate: (selectedDate: State['selectedDate']) => void,
    setReturnToFirstStep: (returnToFirstStep: State['returnToFirstStep']) => void,
    setJumpToNextStep: (jumpToNextStep: State['jumpToNextStep']) => void,
    setIsCancelAppointmentModalOpen: (isCancelAppointmentModalOpen: State['isCancelAppointmentModalOpen']) => void
};

const useGlobalStore = create <State & Action>((set) => ({
    selectedConsultation: [],
    addConsultation: (selectedConsultation) => 
        set((state) => ({
            selectedConsultation: [...state.selectedConsultation, ...selectedConsultation]
    })),
    removeConsultation: (selectedConsultation) => 
        set((state) => ({                              // será vddeira qdo o gênero não estiver presente 
        selectedConsultation: state.selectedConsultation.filter(consultation => !selectedConsultation.includes(consultation)) 
    })),

    selectedEspeciality: [],
    addEspeciality: (selectedEspeciality) =>
        set((state) => ({                              
            selectedEspeciality: [...state.selectedEspeciality, ...selectedEspeciality]
    })),
    removeEspeciality: (selectedEspeciality) =>
        set((state) => ({                             
            selectedEspeciality: state.selectedEspeciality.filter(especiality => !selectedEspeciality.includes(especiality))
    })),

    selectedDate: [],
    addDate: (selectedDate) =>
        set((state) => ({                             
            selectedDate: [...state.selectedDate, ...selectedDate]
    })),
    removeDate: (selectedDate) =>
        set((state) => ({                             
            selectedDate: state.selectedDate.filter(especiality => !selectedDate.includes(especiality))
    })),

    returnToFirstStep: false,
    setReturnToFirstStep: (value: boolean) => set({ returnToFirstStep: value }),
    jumpToNextStep: false,
    setJumpToNextStep: (value: boolean) => set({ jumpToNextStep: value}),
    isCancelAppointmentModalOpen: false,
    setIsCancelAppointmentModalOpen: (value: boolean) => set({ isCancelAppointmentModalOpen: value}),

}));

export default useGlobalStore;