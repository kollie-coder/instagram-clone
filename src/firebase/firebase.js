import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDI8Fp6JYqjlT88yisb7GRTfLrQn15JUSo",
  authDomain: "insta-clone-ktech.firebaseapp.com",
  projectId: "insta-clone-ktech",
  storageBucket: "insta-clone-ktech.appspot.com",
  messagingSenderId: "753230702032",
  appId: "1:753230702032:web:89a399b61970de261cc5d5",
  measurementId: "G-5VED248RSE"
};

 
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app); 
const storage = getStorage(app);

export {app, auth, firestore, storage};