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