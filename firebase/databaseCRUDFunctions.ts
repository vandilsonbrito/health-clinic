import { child, get, ref, remove, set, update, push } from 'firebase/database';
import { database } from './firebaseDBConfig';
import { AppointmentFormatType, ProfessionalData, UserProfileData } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

export async function addDataToDB({ route, data }: { route: string, data: ProfessionalData | AppointmentFormatType[]}) {
    try {
        const dbRef = ref(database, route); 

        if(data as AppointmentFormatType[]) {
            push(dbRef, data);
            return "Saved data successfully"
        }
        else {
          await set(dbRef, data);
          return "Saved data successfully"
        }
    } 
    catch (error) {
        console.error('Error adding user: ', error);
    }
};


export const useDataFromDB = ({ route, queryKey }: { route: string, queryKey: string }) => {

  const fetchDataFromDB = async () => {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, route));
    if(snapshot.exists()) {
        return snapshot.val();
    }
    else {
      return null;
    }
  }

  const query = useQuery({
    queryFn: fetchDataFromDB,
    queryKey: [queryKey],

  })
  return query;
}

export const useGetAppointmentsDataFromDB = ({ route, userID }: { route: string, userID: string }) => {

  const fetchDataFromDB = async () => {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, route));
    if(snapshot.exists()) {
        return snapshot.val();
      }
    else {
      return null;
    }
  }

  const query = useQuery({
    queryFn: fetchDataFromDB,
    queryKey: ['user-appointments-data'],
    enabled: !!userID
  })
  return query;
}

export async function updateDBData({ route, data }: { route: string, data: UserProfileData }) {
    const dbRef = ref(database, route);
    try {
        await update(dbRef, data);
        return 'Successfully updated'
    }
    catch(error) {
      console.error('Error updating data: ', error);
      return 'Error updating'
    }
}

export async function deleteDBData({route}: { route: string }) {
    const userRef = ref(database, route);
    try {
      await remove(userRef);
      return 'Data removed successfully'
    } 
    catch (error) {
      console.error('Error removing data: ', error);
    }
}