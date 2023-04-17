
// Initialize Firebase
// const { initializeApp } = require("firebase/app");

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {useEffect, useState} from "react";
import { onAuthStateChanged } from "firebase/auth";
// Add relevant imports here
import firebaseConfig from "/src/firebaseConfig.js";

// Initialize Firebase Authentication and get a reference to the service
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const db = getFirestore();

export { auth, db};
//Costum Hook
export function useAuth(){
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
        return unsub;
      },[]);

      return currentUser;
}