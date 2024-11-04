import { child, get, ref, remove, set, update, push } from 'firebase/database';
import { database } from './firebaseDBConfig';
import { AppointmentFormatType, ProfessionalData } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

export async function addDataToDB({ route, data }: { route: string, data: ProfessionalData | AppointmentFormatType[]}) {
    try {
        const dbRef = ref(database, route); 

        if(data as AppointmentFormatType[]) {
            push(dbRef, data);
        }
        else {
          await set(dbRef, data);
        }
        console.log('Data added successfully!');
    } catch (error) {
        console.error('Error adding user: ', error);
    }
};


export const useDataFromDB = ({ route }: { route: string }) => {

  const fetchDataFromDB = async () => {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, route));
    if(snapshot.exists()) {
        console.log('Data got successfully');
        return snapshot.val();
    }
    else {
      throw new Error('No data found!')
    }
  }

  const query = useQuery({
    queryFn: fetchDataFromDB,
    queryKey: ['data'],

  })
  return query;
}

export const useGetAppointmentsDataFromDB = ({ route, userID }: { route: string, userID: string }) => {

  const fetchDataFromDB = async () => {
    const dbRef = ref(database);
    const snapshot = await get(child(dbRef, route));
    if(snapshot.exists()) {
        console.log('Data got successfully');
        return snapshot.val();
    }
    else {
      throw new Error('No data found!')
    }
  }

  const query = useQuery({
    queryFn: fetchDataFromDB,
    queryKey: ['user-appointments-data'],
    enabled: !!userID
  })
  return query;
}

export async function updateDBData({ route, data }: { route: string, data: ProfessionalData }) {
    const dbRef = ref(database, route);
    try {
        await update(dbRef, data);
        console.log('Data updated successfully');
    }
    catch(error) {
        console.error('Error updating data: ', error);
    }
}

export async function deleteDBData({route}: { route: string }) {
    const userRef = ref(database, route);
    try {
      await remove(userRef);
      console.log('Data removed successfully');
      return 'Data removed successfully'
    } 
    catch (error) {
      console.error('Error removing data: ', error);
    }
}