// Initialize Firebase
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
const app = initializeApp(firebaseConfig);
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, getAuth, signOut} from "firebase/auth";

const auth = getAuth(app);

const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
      );
      const user = userCredential.user;
      // await addDoc(collection(db, "users"), {
      //   uid: user.uid,
      //   email: user.email,
      // });
      return true;
    } catch (error) {
      return {error: error.message}
    }
  };

const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
      );
      const user = userCredential.user;
      return true;
    } catch (error) {
      return {error: error.message}}
  };

const signOut2 = async() => {
  try {
    await signOut(auth);
    console.log("sign out MODEL successful");

    return true;
  } catch (error) {
    return false;
  }
};   

import { getDatabase, ref, get, set, onValue } from "firebase/database";
const PATH = "allTrips/";

const db = getDatabase(app);

function modelToPersistence(model) {
  // console.log("model to per");
  // console.log("model to per TEST", getUidUser())
  const result = {
    plans: model.plans,
  };
  // console.log(result);
  return result;
}

async function persistenceToModel(persistedData = {}, model) {
    if(persistedData){
        if(persistedData.plans){
            model.plans = persistedData.plans;
        }
        else{
            model.plans = [];
        }
    }
    else{
        model.plans = [];
    }
    // console.log("per to model")
    // console.log("per to model:",model);
    return model; //  return a promise
}

  function obsSetACB(model) {

    set(ref(db, PATH+model.user.uid), modelToPersistence(model));
    console.log("HERE");
    return model;
  
  }
  
  export default function firebaseModelPromise(model) {

    let dataFromFirebase = get(ref(db, PATH+model.user.uid))
      .then( res => {
        return persistenceToModel(res.val(), model);
      })
      .then(res => {
        model.addObserver(() => {
          set(ref(db, PATH+model.user.uid), modelToPersistence(model));
        });
        obsSetACB(model);
        return model;
      });
    return dataFromFirebase;
}

async function firebaseModelPromise2(model){
  const data = await get(ref(db, PATH+model.user.uid));
  persistenceToModel(data.val(),model);
}

export {
    // auth,
    signUp,
    signIn,
    signOut2,
    modelToPersistence,
    persistenceToModel,
    firebaseModelPromise,
  };
  

