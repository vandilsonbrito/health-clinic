import { child, get, ref, set, update, query, orderByChild, equalTo } from 'firebase/database';
import { database } from './firebaseDBConfig';
import { UpdateProfileType, UserProfileData } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';

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

export async function updateDBData({ route, data }: { route: string, data: UpdateProfileType | UserProfileData }) {
  const dbRef = ref(database, route);
  try {
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
          await update(dbRef, data);
          return 200;
      } else {
          await set(dbRef, data);
          return 201;
      }
  } catch (error) {
      console.error('Error updating data: ', error);
      return 'Error updating';
  }
}

const fetchUserAppointments = async (userID?: string) => {
  const dbRef = ref(database, "appointments");
  const appointmentsQuery = userID
    ? query(dbRef, orderByChild("patientId"), equalTo(userID))
    : query(dbRef);

  try {
    const snapshot = await get(appointmentsQuery);
    if(snapshot.exists()) {
      return Object.values(snapshot.val());
    }
    return [];
  } catch (error) {
    console.error("Error fetching user appointments:", error);
    throw new Error("Erro ao buscar os agendamentos.");
  }
};

export const useFetchUserAppointmentsClient = (userID: string) => {
  return useQuery({
    queryKey: ["user-appointments-data", userID],
    queryFn: () => fetchUserAppointments(userID),
    enabled: !!userID
  });
};
export const useFetchUserAppointmentsAdmin = () => {
  return useQuery({
    queryKey: ["user-appointments-data-admin"],
    queryFn: () => fetchUserAppointments()
  });
};
