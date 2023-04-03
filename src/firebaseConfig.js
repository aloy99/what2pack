import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {useEffect, useState} from "react";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD66bRmyipfoGde6zXp39qLlTzPR8tWoAE",
  authDomain: "what2pack2023.firebaseapp.com",
  databaseURL: "https://what2pack2023-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "what2pack2023",
  storageBucket: "what2pack2023.appspot.com",
  messagingSenderId: "813344473696",
  appId: "1:813344473696:web:98d93c1e805c798cdd7905",
  measurementId: "G-8WCB4CM2H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
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