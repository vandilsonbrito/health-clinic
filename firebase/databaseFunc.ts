import { child, get, ref, remove, set, update } from 'firebase/database';
import { database } from './firebaseDBConfig';
import { ProfessionalData } from '@/utils/types';

export async function addData({ route, data }: { route: string, data: ProfessionalData }) {
  try {
    const dbRef = ref(database, route); 
    await set(dbRef, data);
    console.log('Data added successfully!');
  } catch (error) {
    console.error('Error adding user: ', error);
  }
};

export async function getData({ route }: { route: string }) {
    const dbRef = ref(database);
    try {
        const snapshot = await get(child(dbRef, route));
        if(snapshot.exists()) {
            console.log('Data got successfully');
            return snapshot.val();
        }
    }
    catch(error) {
        console.error('Error fetching data: ', error)
    }
}

export async function updateData({ route, data }: { route: string, data: ProfessionalData }) {
    const dbRef = ref(database, route);
    try {
        await update(dbRef, data);
        console.log('Data updated successfully');
    }
    catch(error) {
        console.error('Error updating data: ', error);
    }
}

export async function deleteData(route: string) {
    const userRef = ref(database, route);
    try {
      await remove(userRef);
      console.log('Data removed successfully');
    } 
    catch (error) {
      console.error('Error removing data: ', error);
    }
  }