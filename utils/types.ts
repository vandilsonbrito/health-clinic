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

export interface selectedConsultationType {
    especiality: string,
    especialityName: string,
    date: string,
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