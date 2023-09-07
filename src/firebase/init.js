import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: 'AIzaSyAWTdzar7sJsqNE5Hni2BW8VbgppsBiJFw',
  authDomain: 'name-game-c89f6.firebaseapp.com',
  projectId: 'name-game-c89f6',
  storageBucket: 'name-game-c89f6.appspot.com',
  messagingSenderId: '857952367222',
  appId: '1:857952367222:web:93e70f4a4829d7df01a557',
  measurementId: 'G-ZTE3SX2WZB',
};

// init firebase
initializeApp(firebaseConfig)

// init firestore service
const db = getFirestore()
export default db