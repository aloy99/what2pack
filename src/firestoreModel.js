import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore'; 
import { db } from './firebaseModel';

const TRIPS_DB = 'trips';

export function addTrip(uid, locationName, startDate, endDate) {
  addDoc(collection(db, TRIPS_DB), { uid, locationName, startDate, endDate});
}

export async function getTrips(uid, setTrips, setIsLoadingTrips) {
  const tripsQuery = query(collection(db, TRIPS_DB), where("uid", "==", uid), orderBy("locationName", "desc"));

  const unsubscribe = onSnapshot(tripsQuery, async (snapshot) => {
    let allTrips = [];
    for (const documentSnapshot of snapshot.docs) {
      const trip = documentSnapshot.data();
      allTrips.push({
        ...trip, 
        id: documentSnapshot.id,
      });
      console.log(trip);
    }
    setTrips(allTrips);
    setIsLoadingTrips(false);
  })
  return unsubscribe;
}

// // Updates receipt with @docId with given information.
// export function updateReceipt(docId, uid, date, locationName, address, items, amount, imageBucket) {
//   setDoc(doc(db, RECEIPT_COLLECTION, docId), { uid, date, locationName, address, items, amount, imageBucket });
// }

// // Deletes receipt with given @id.
// export function deleteReceipt(id) {
//   deleteDoc(doc(db, RECEIPT_COLLECTION, id));
// }


// OLD
// const RECEIPT_COLLECTION = 'receipts';

// export function addReceipt(uid, date, locationName, address, items, amount, imageBucket) {
//   addDoc(collection(db, RECEIPT_COLLECTION), { uid, date, locationName, address, items, amount, imageBucket });
// }

// export async function getReceipts(uid, setReceipts, setIsLoadingReceipts) {
//   const receiptsQuery = query(collection(db, RECEIPT_COLLECTION), where("uid", "==", uid), orderBy("date", "desc"));

//   const unsubscribe = onSnapshot(receiptsQuery, async (snapshot) => {
//     let allReceipts = [];
//     for (const documentSnapshot of snapshot.docs) {
//       const receipt = documentSnapshot.data();
//       allReceipts.push({
//         ...receipt, 
//         // date: receipt['date'].toDate(), 
//         id: documentSnapshot.id,
//         // imageUrl: await getDownloadURL(receipt['imageBucket']),
//       });
//       console.log(receipt);
//     }
//     setReceipts(allReceipts);
//     setIsLoadingReceipts(false);
//   })
//   return unsubscribe;
// }