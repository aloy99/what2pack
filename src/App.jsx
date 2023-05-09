import {Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';
import StartPresenter from './reactjs/startPresenter.jsx';
import DetailsPresenter from './reactjs/detailsPresenter.jsx';
import ProfilePresenter from './reactjs/profilePresenter.jsx';
import What2PackModel from './What2PackModel';
import './App.css';
import AuthPresenter from './reactjs/authPresenter.jsx';
import Navbar from './views/Navbar.jsx';
import firebaseModelPromise from "./firebaseModel.js";
import resolvePromise from "./resolvePromise.js";


const myModel = new What2PackModel();

function App() {
  const [promiseState,] = useState({});
  useEffect(() => {
    resolvePromise(firebaseModelPromise(myModel), promiseState);
    console.log('promiseState: HELLO',promiseState);
    updateOnPromise(promiseState.promise, reRenderACB);
  }, [myModel]);
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


  return (
    <>
    <Navbar />
    {/* <div className="nav-container"> */}
      <Routes>
        <Route path='/' element={<StartPresenter model={myModel}/>}></Route>
        {/* <Route path='/start' element={<StartPresenter model={myModel}/>}></Route> */}
        <Route path='/login' element={<AuthPresenter model={myModel}/>}></Route>
        <Route path='/details' element={<DetailsPresenter model={myModel}/>}></Route>
        <Route path='/profile' element={<ProfilePresenter model={myModel}/>}></Route>
      </Routes>
      {/* </div> */}
    </>
  )
}

export default App;
