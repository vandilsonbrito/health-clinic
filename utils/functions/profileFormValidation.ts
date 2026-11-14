import { UserProfileData } from "../types";

export const areAllFieldsRequired = (data: UserProfileData, requiredFields: string[]) => {
    return requiredFields.every((fields) => {
        const value = data[fields as keyof UserProfileData];
        return value !== undefined && value !== null && value !== '';
    })
}