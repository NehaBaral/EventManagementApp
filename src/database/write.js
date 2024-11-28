
import { db } from './config';
import { doc, collection, addDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export async function addEvent(data) {
    try{
    const dbCollection = collection(db, 'Events');
    const eventsRef = await addDoc(dbCollection, data);
    return eventsRef.id;
  } catch (error) {
    console.error('Error Adding events', error);
    return null;
  }
}

export async function updateEventFavourite(id, data) {
  try {
      const docRef = doc(db, 'Events', id);
      await updateDoc(docRef, data)
      return true;
  } catch (e) {
    console.log('error', e)
      return false;
  }
}