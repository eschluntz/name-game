import { collection, query, getDocs, doc, addDoc, getDoc, setDoc, deleteDoc } from 'firebase/firestore';
import db from './firebase/init.js';

export function shuffle(array) {
  // Fisher Yates shuffling inlined to avoid importing another dependency
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function deepCopy(originalObj) {
  return JSON.parse(JSON.stringify(originalObj));
}

export async function loadPeopleList(whichList) {
  const colRef = collection(db, 'scoreList', whichList, 'people');
  const querySnap = await getDocs(query(colRef));
  return querySnap.docs.map((doc) => {
    return doc.data();
  });
}

export async function loadAllLists() {
  const colRef = collection(db, 'scoreList');
  const querySnap = await getDocs(query(colRef));
  // console.log("hi")
  return querySnap.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    }
  });
}

export async function loadListDisplayName(whichList) {
  const docRef = doc(db, 'scoreList', whichList);
  const docSnap = await getDoc(docRef);
  // return empty string if document doesn't exist yet
  return docSnap.exists() ? docSnap.data().displayName : '';
}

export async function saveList(whichList, people, displayName) {
  
  // save displayName
  if (whichList) {
    const docRef = doc(db, 'scoreList', whichList);
    await setDoc(docRef, {displayName: displayName});
  } else {
    // create new document
    const listCollectionRef = collection(db, 'scoreList');
    const newDocRef = await addDoc(listCollectionRef, {displayName: displayName});
    whichList = newDocRef.id;
  }

  const collectionRef = collection(db, 'scoreList', whichList, 'people');

  // Delete existing documents
  const querySnap = await getDocs(query(collectionRef))
  querySnap.docs.forEach(doc => deleteDoc(doc.ref));
  
  // Add new documents
  people.forEach(async (obj) => {
    await addDoc(collectionRef, obj);
  });

  return whichList;
}
