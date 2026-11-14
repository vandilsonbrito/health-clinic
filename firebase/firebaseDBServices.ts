import { child, get, ref, remove, set, update, push, query, orderByChild, equalTo } from 'firebase/database';
import { database } from './firebaseDBConfig';
import { AppointmentFormatType, ProfessionalData, UpdateProfileType, UserProfileData } from '@/utils/types';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

export const addDataToDB = async ({ route, data }: { route: string, data: ProfessionalData | AppointmentFormatType }) => {
    try {
        const dbRef = ref(database, route); 

        if("professionalName" in data && "patientName" in data ){ 
            const newRef = push(dbRef);
            const newId = newRef.key as string;

            (data as AppointmentFormatType).id = newId as string;
            await set(newRef, data);

            return 201
        }
        else {
          const newId = crypto.randomUUID();
          const formatRoute = data.name.split(' ').slice(1).join('-').toLowerCase()
          const updatedData = { 
            [formatRoute]: {
              ...data, 
              specialty: data.specialty.charAt(0).toUpperCase() + data.specialty.slice(1),
              id: newId  
            }
          };
          console.log('updatedData', updatedData);
          await update(dbRef, updatedData);
          return 201
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

export async function updateDBData({ route, data }: { route: string, data: UpdateProfileType | UserProfileData }) {
  const dbRef = ref(database, route);
  try {
      const snapshot = await get(dbRef);

      if (snapshot.exists()) {
          const existingData = snapshot.val();
          console.log('existingData', existingData);

          if ('lastAppointmentDate' in data && data.lastAppointmentDate) {
              const totalAppointments = (data as UserProfileData).totalOfAppointments || 0;

              await update(dbRef, {
                  lastAppointmentDate: data.lastAppointmentDate,
                  totalOfAppointments: totalAppointments 
              });
          } else {
              await update(dbRef, data);
          }

          return 200;
      } else {
          console.log("Nenhum dado encontrado, criando novo registro.");
          await set(dbRef, data);
          return 201;
      }
  } catch (error) {
      console.error('Error updating data: ', error);
      return 'Error updating';
  }
}

export async function deleteDBData({route}: { route: string }) {
    const userRef = ref(database, route);
    try {
      await remove(userRef);
      return 200
    } 
    catch (error) {
      console.error('Error removing data: ', error);
    }
}

const fetchUserAppointments = async (userID?: string) => {
  const dbRef = ref(database, "appointments");
  let userAppointmentsQuery;
  if(userID) {
    userAppointmentsQuery = query(dbRef, orderByChild("patientId"), equalTo(userID));
  }
  else {
    userAppointmentsQuery = query(dbRef);
  }

  try {
    let snapshot;
    if(userAppointmentsQuery) {
      snapshot = await get(userAppointmentsQuery);
    }
    if(snapshot && snapshot.exists()) {
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

export async function updateMontlhyCount(action: 'increment' | 'decrement') {
  const currentMonth = format(new Date(), "yyyy-MM");
  const dbRef = ref(database, `clinicInfo/monthlyAppointments/${currentMonth}`);

  try {
    const snapshot = await get(dbRef);
    const currentCount = snapshot.val() || 0;

    const newCount = action === 'increment' ? currentCount + 1 : Math.max(0, currentCount - 1);
    await update(ref(database, "clinicInfo/monthlyAppointments"), { [currentMonth]: newCount });
  }
  catch (error) {
    console.error("Error updating monthly count:", error); 
  }
}

 async function fetchLastSixMonthsAppointments() {
  const dbRef = ref(database, "clinicInfo/monthlyAppointments");
  try {
    const snapshot = await get(dbRef);
    const allData = snapshot.val();
    const lastSixMonths = Object.entries(allData)
      .slice(-6)
      .reverse()
      .map(([month, count]) => ({ month, count }));

    return lastSixMonths;

  } catch (error) {
    console.error("Error fetching last six months appointments:", error);
  }
}
export function useLastSixMonthsAppointments() {
  return useQuery({
    queryKey: ["lastSixMonthsAppointments"],
    queryFn: fetchLastSixMonthsAppointments,
    staleTime: 1000 * 60 * 5, // Cache 5 min
  });
}