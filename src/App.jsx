import {Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import StartPresenter from './reactjs/startPresenter.jsx';
import DetailsPresenter from './reactjs/detailsPresenter.jsx';
import ProfilePresenter from './reactjs/profilePresenter.jsx';
import NavPresenter from './reactjs/navPresenter.jsx';
import What2PackModel from './What2PackModel';
import './App.css';
import AuthPresenter from './reactjs/authPresenter.jsx';
// import NavbarView from './views/navbarView.jsx';
import {firebaseModelPromise} from "./firebaseModel.js";
import resolvePromise from "./resolvePromise.js";
import {getAuth,onAuthStateChanged} from "firebase/auth";


const myModel = new What2PackModel();
// const auth = getAuth(app);


function App() {
  const [, forceReRender] = useState();
  function reRenderACB() {
    forceReRender(new Object());
  }
  function updateOnPromise(promise, reRender) {
    if (promise) {
      promise.then(reRender).catch(reRender);
      reRender();
    }
  }
  const [promiseState,] = useState({});
  const auth = getAuth();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
    if (user) {
      // console.log("app user:", user)
      myModel.user = user;
      resolvePromise(firebaseModelPromise(myModel), promiseState);
      // console.log('promiseState: HELLO',promiseState);
      updateOnPromise(promiseState.promise, reRenderACB);

    } else{
      // myModel =  new What2PackModel();
      myModel.user = null;

      }
    }
    );
},[]);

  return (
    <>
    {/* <Navbar /> */}
    <NavPresenter model={myModel} />
      <Routes>
        <Route path='/' element={<StartPresenter model={myModel}/>}></Route>
        <Route path='/login' element={<AuthPresenter model={myModel}/>}></Route>
        <Route path='/details' element={<DetailsPresenter model={myModel}/>}></Route>
        <Route path='/profile' element={<ProfilePresenter model={myModel}/>}></Route>
      </Routes>
    </>
  )
}

export default App;

  // useEffect(() => {
  //   resolvePromise(firebaseModelPromise(myModel), promiseState);
  //   console.log('promiseState: HELLO',promiseState);
  //   updateOnPromise(promiseState.promise, reRenderACB);
  // }, [myModel.user]);
  // const [, forceReRender] = useState();
