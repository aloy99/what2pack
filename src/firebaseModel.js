// Initialize Firebase
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
var userUid = "";

import { getDatabase, ref, get, set, onValue } from "firebase/database";

var PATH = "allTrips";

auth.onAuthStateChanged((user) => {
    if (user) {
        userUid = user.uid;
        PATH = "allTrips/"+ userUid;
    console.log("UIIDDD:" ,user.uid);

    } else{
        PATH = "guest";
        userUid = "guest";
    }
});


const db = getDatabase(app);


  function modelToPersistence(model) {
    console.log("model to per");
    // console.log("model to per TEST", getUidUser())
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
  

