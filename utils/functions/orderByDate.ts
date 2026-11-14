import { AppointmentFormatType } from "../types";

export const orderByDate = (data: AppointmentFormatType[]) => data?.slice().sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
);