import { create } from 'zustand';
import { selectedConsultationType } from './types';

export type State = {
    selectedConsultation: selectedConsultationType[]
    selectedEspeciality: string[]
    selectedDate: string[],
    returnToFirstStep: boolean
};

export type Action = {
    addConsultation: (selectedConsultation: State['selectedConsultation']) => void,
    removeConsultation: (selectedConsultation: State['selectedConsultation']) => void,
    addEspeciality: (selectedEspeciality: State['selectedEspeciality']) => void,
    removeEspeciality: (selectedEspeciality: State['selectedEspeciality']) => void,
    addDate: (selectedDate: State['selectedDate']) => void,
    removeDate: (selectedDate: State['selectedDate']) => void,
    setReturnToFirstStep: (returnToFirstStep: State['returnToFirstStep']) => void
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
    setReturnToFirstStep: (value: boolean) => set({ returnToFirstStep: value })

}));

export default useGlobalStore;