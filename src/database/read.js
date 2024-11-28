//  To retireve data from firebase
import { collection, getDocs, getDoc, query, where, doc } from 'firebase/firestore';
import { db, auth } from './config';

export async function fetchEvents(email) {
    const dbCollection = collection(db, 'Events')
    const dbQuery = query(dbCollection, where('email', "==", email))
    const querySnapshot = await getDocs(dbQuery);

    return processQuerySnapshot(querySnapshot)
}

function processQuerySnapshot(querySnapshot) {
    const data = [];

    querySnapshot.forEach((doc) => {
        data.push({
            ...doc.data(),
            id: doc.id
        });
    });
    return data;
}