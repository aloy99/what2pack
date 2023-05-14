// Initialize Firebase
import firebaseConfig from "/src/firebaseConfig.js";
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth, signOut} from "firebase/auth";
import { getDatabase, ref, get, set} from "firebase/database";
const PATH = "allTrips/";
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
      );
      return true;
    } catch (error) {
      return {error: error.message}
    }
  };

const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(
      auth,
      email,
      password
      );
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

function modelToPersistence(model) {
  console.log("model to per:model", model);
  let persistedPlans = {plans:[]};
  const modelPlans = model.plans;
  for(let plan of modelPlans){ // for every plan
    let persistedWeathers = [];
    for(let weather of plan.weathers){ // for every day
      for(let item in weather){ // for every type of weather forecast
        if(weather[item] === undefined){
          weather[item] = 'undefined';
        }
      }
      persistedWeathers.push(weather);
    }
    plan.weathers = persistedWeathers;
    persistedPlans.plans.push(plan);
  }
  console.log("model to per:per", persistedPlans);
  return persistedPlans;
}

async function persistenceToModel(persistedData = {}, model) {
  console.log("per to model:per",persistedData);
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
  console.log("per to model:model",model);
  return model; //  return a promise
}

function obsSetACB(model) {
  if(model.user){
    set(ref(db, PATH+model.user.uid), modelToPersistence(model));
    return model;
  }
}
  
export default function firebaseModelPromise(model) {
  if(model.user){
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
  

