import { User } from "firebase/auth";

export interface AuthContextType {
    userAuth: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    authLoading: boolean; 
}

export interface ProfessionalData {
    name: string;
    especiality: string;
    agenda: {
        date: string[],
        time: string[]
    }
}

export interface AppointmentFormatType {
    especiality: string,
    professionalName: string,
    date: string,
    time: string
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
export interface ProfessionalData {
    [key: number]: {
        professionalName: {
            especiality: string,
            name: string,
            agenda: {
                date: string[],
                time: string[]
            }
        }
    }
}

export interface UserProfileData {
    name: string,
    email: string,
    cpf: string,
    street: string,
    neighborhood: string,
    cityState: string,
    cellphone: string
}