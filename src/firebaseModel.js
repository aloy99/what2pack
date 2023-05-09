// Initialize Firebase
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const db = getFirestore();

import { getDatabase, ref, get, set, onValue } from "firebase/database";

const db = getDatabase(app);
const PATH = "allTrips";


  function modelToPersistence(model) {
    console.log("model to per")
    const result = {
      allPlans: model.plans,
    };
    console.log(result);
    return result
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
    console.log("per to model")
    console.log("per to model:",model);
    return model; //  return a promise
}

  function obsSetACB(model) {
    set(ref(db, PATH), modelToPersistence(model));
    console.log("HERE");
    return model;
  
  }
  
  export default function firebaseModelPromise(model) {
    let dataFromFirebase = get(ref(db, PATH))
      .then( res => {
        return persistenceToModel(res.val(), model);
      })
      .then(res => {
        model.addObserver(() => {
          set(ref(db, PATH), modelToPersistence(model));
        });
        obsSetACB(model);
        return model;
      });
    return dataFromFirebase;
}

export {
    auth,
    modelToPersistence,
    persistenceToModel,
    firebaseModelPromise,
  };
  

