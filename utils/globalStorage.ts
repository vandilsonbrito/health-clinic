import { create } from 'zustand';

export type State = {
    selectedEspeciality: string[]
    selectedDate: string[],
    returnToScheduleAppointmentFirstStep: boolean
    jumpToScheduleAppointmentNextStep: boolean, 
    isCancelAppointmentModalOpen: boolean, 
    isAppointmentScheduled: boolean
};

export type Action = {
    addEspeciality: (selectedEspeciality: State['selectedEspeciality']) => void,
    removeEspeciality: (selectedEspeciality: State['selectedEspeciality']) => void,
    addDate: (selectedDate: State['selectedDate']) => void,
    removeDate: (selectedDate: State['selectedDate']) => void,
    setReturnToScheduleAppointmentFirstStep: (returnToScheduleAppointmentFirstStep: State['returnToScheduleAppointmentFirstStep']) => void,
    setJumpToScheduleAppointmentNextStep: (jumpToScheduleAppointmentNextStep: State['jumpToScheduleAppointmentNextStep']) => void,
    setIsCancelAppointmentModalOpen: (isCancelAppointmentModalOpen: State['isCancelAppointmentModalOpen']) => void,
    setIsAppointmentScheduled: (isAppointmentScheduled: State['isAppointmentScheduled']) => void
};

const useGlobalStore = create <State & Action>((set) => ({
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

    returnToScheduleAppointmentFirstStep: false,
    setReturnToScheduleAppointmentFirstStep: (value: boolean) => set({ returnToScheduleAppointmentFirstStep: value }),
    jumpToScheduleAppointmentNextStep: false,
    setJumpToScheduleAppointmentNextStep: (value: boolean) => set({ jumpToScheduleAppointmentNextStep: value}),
    isCancelAppointmentModalOpen: false,
    setIsCancelAppointmentModalOpen: (value: boolean) => set({ isCancelAppointmentModalOpen: value}),
    isAppointmentScheduled: false,
    setIsAppointmentScheduled: (value: boolean) => set({ isAppointmentScheduled: value })

}));

export default useGlobalStore;