import { UserProfileData } from "../types";

export function isProfileInfoFilled(userProfileData: UserProfileData) {
    const { cpf, street, neighborhood, cityState, cellphone } = userProfileData;

    if(cpf && street && neighborhood && cityState && cellphone) {
        return true;
    }
    return false;
}