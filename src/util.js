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

// export var peopleData = {
//   ceos: [
//     {
//       name: 'Satya Nadella',
//       about: 'CEO of Microsoft',
//       faceUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg/330px-MS-Exec-Nadella-Satya-2017-08-31-22_%28cropped%29.jpg',
//     },
//     {
//       name: 'Elon Musk',
//       about: 'CEO of Tesla and SpaceX',
//       faceUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Elon_Musk_Colorado_2022_%28cropped2%29.jpg/330px-Elon_Musk_Colorado_2022_%28cropped2%29.jpg',
//     },
//     {
//       name: 'Tim Cook',
//       about: 'CEO of Apple',
//       faceUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/%D0%A2%D0%B8%D0%BC_%D0%9A%D1%83%D0%BA_%2802-09-2021%29.jpg/330px-%D0%A2%D0%B8%D0%BC_%D0%9A%D1%83%D0%BA_%2802-09-2021%29.jpg',
//     },
//     {
//       name: 'Sundar Pichai',
//       about: 'CEO of Google',
//       faceUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Sundar_Pichai_%282023%29_cropped.jpg/330px-Sundar_Pichai_%282023%29_cropped.jpg',
//     },
//   ],
//   vcs: [
//     {
//       name: 'Mark Zuckerberg',
//       about: 'CEO of Facebook',
//       faceUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg/330px-Mark_Zuckerberg_F8_2019_Keynote_%2832830578717%29_%28cropped%29.jpg',
//     },
//     {
//       name: 'Jensen Huang',
//       about: 'CEO of Nvidia',
//       faceUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Jensen_Huang_%28cropped%29.jpg/330px-Jensen_Huang_%28cropped%29.jpg',
//     },
//     {
//       name: 'Jeff Bezos',
//       about: 'Former CEO of Amazon',
//       faceUrl:
//         'https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg/330px-Jeff_Bezos_visits_LAAFB_SMC_%283908618%29_%28cropped%29.jpeg',
//     },
//   ],
// };
