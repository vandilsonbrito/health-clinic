import { create } from 'zustand';

export type State = {
    sectionNumber: number,
    selectedEspeciality: string[]
    selectedDate: string[],
    returnToScheduleAppointmentFirstStep: boolean,
    jumpToScheduleAppointmentNextStep: boolean, 
    isCancelAppointmentModalOpen: boolean, 
    isAppointmentScheduled: boolean,
    isCancelAppointmentBtnClicked: boolean,
    respondedValueModalAppointmentCancel: boolean,
    showDeleteAppointmentMessage: boolean,
    removeSelectedAppointment: string[],
    cameFromSignUp: boolean,
    isFirstLogin: boolean,
    isUserProfileDBFilled: boolean,
    isReadyToChooseDate: boolean,
};

export type Action = {
    setSectionNumber: (sectionNumber: State['sectionNumber']) => void,
    addEspeciality: (selectedEspeciality: State['selectedEspeciality']) => void,
    removeEspeciality: (selectedEspeciality: State['selectedEspeciality']) => void,
    addDate: (selectedDate: State['selectedDate']) => void,
    removeDate: (selectedDate: State['selectedDate']) => void,
    setReturnToScheduleAppointmentFirstStep: (returnToScheduleAppointmentFirstStep: State['returnToScheduleAppointmentFirstStep']) => void,
    setJumpToScheduleAppointmentNextStep: (jumpToScheduleAppointmentNextStep: State['jumpToScheduleAppointmentNextStep']) => void,
    setIsCancelAppointmentModalOpen: (isCancelAppointmentModalOpen: State['isCancelAppointmentModalOpen']) => void,
    setIsAppointmentScheduled: (isAppointmentScheduled: State['isAppointmentScheduled']) => void,
    setIsCancelAppointmentBtnClicked: (isCancelAppointmentBtnClicked: State['isCancelAppointmentBtnClicked']) => void,
    setRespondedValueModalAppointmentCancel: (respondedValueModalAppointmentCancel: State['respondedValueModalAppointmentCancel']) => void,
    setShowDeleteAppointmentMessage: (showDeleteAppointmentMessage: State['showDeleteAppointmentMessage']) => void,
    setRemoveSelectedAppointment: (removeSelectedAppointment: State['removeSelectedAppointment']) => void,
    setCameFromSignUp: (cameFromSignUp: State['cameFromSignUp']) => void,
    setIsUserProfileDBFilled: (isUserProfileDBFilled: State['isUserProfileDBFilled']) => void,
    setIsFirstLogin: (isFirstLogin: State['isFirstLogin']) => void,
    setIsReadyToChooseDate: (isReadyToChooseDate: State['isReadyToChooseDate']) => void
};

const useGlobalStore = create <State & Action>((set) => ({
    sectionNumber: 0,
    setSectionNumber: (value: number) => set ({ sectionNumber: value }),

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
    setIsAppointmentScheduled: (value: boolean) => set({ isAppointmentScheduled: value }),
    isCancelAppointmentBtnClicked: false,
    setIsCancelAppointmentBtnClicked: (value: boolean) => set({ isCancelAppointmentBtnClicked: value }),
    respondedValueModalAppointmentCancel: false,
    setRespondedValueModalAppointmentCancel: (value: boolean) => set({ respondedValueModalAppointmentCancel: value }),
    showDeleteAppointmentMessage: false,
    setShowDeleteAppointmentMessage: (value: boolean) => set({ showDeleteAppointmentMessage: value }),

    removeSelectedAppointment: [],
    setRemoveSelectedAppointment: (value: string[]) => set({ removeSelectedAppointment: value }),

    cameFromSignUp: false,
    setCameFromSignUp: (value: boolean) => set({ cameFromSignUp: value }),
    isFirstLogin: false,
    setIsFirstLogin: (value: boolean) => set({ isFirstLogin: value }),
    isUserProfileDBFilled: false,
    setIsUserProfileDBFilled: (value: boolean) => set({ isUserProfileDBFilled: value }),
    
    isReadyToChooseDate: false,
    setIsReadyToChooseDate: (value: boolean) => set({ isReadyToChooseDate: value }),
}));

export default useGlobalStore;