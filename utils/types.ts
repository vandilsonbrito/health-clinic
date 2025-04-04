import { User } from "firebase/auth";

export interface AuthContextType {
    userAuth: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    authLoading: boolean; 
}

export interface AppointmentFormatType {
    id: string,
    specialty: string,
    professionalName: string,
    date: string,
    time: string,
    status: string,
    patientId: string,
    patientName: string
}
export interface AppointmentDateTime {
    date: string, 
    time: string
}

export interface SectionsObjType {
    [key: number]: React.ReactElement
} 

export interface ServicesDataType {
    especiality: ProfessionalData
}
export interface ProfessionalDataRoute {
    [key: number]: {
        [key: string]: ProfessionalData
    }
}
export interface ProfessionalData {
    specialty: string,
    name: string,
    agenda: {
        date: string[],
        time: string[]
    },
    crm: string,
    phone: string,
    email: string
    pix_key: string,
    id: string
}

export interface UserProfileData {
    name: string,
    email: string,
    cpf: string,
    street: string,
    neighborhood: string,
    cityState: string,
    cellphone: string
    lastAppointmentDate: string,
    totalOfAppointments: number,
    nextAppointments: string[]
}
interface LastAppointmentDateType {
    lastAppointmentDate: string
}
interface TotalOfAppointmentsType {
    totalOfAppointments: number
}
interface NextAppointmentsType {
    nextAppointments: string[]
}
interface AppointmentStatusType {
    status: string
}

export type UpdateProfileType = 
    UserProfileData | 
    LastAppointmentDateType | 
    NextAppointmentsType | 
    TotalOfAppointmentsType | 
    AppointmentStatusType