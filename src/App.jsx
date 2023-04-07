import { useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import StartPresenter from './reactjs/startPresenter.jsx';
import LoginPresenter from './reactjs/loginPresenter.jsx';
import DetailsPresenter from './reactjs/detailsPresenter.jsx';
import ProfilePresenter from './reactjs/profilePresenter.jsx';
import What2PackModel from './What2PackModel';
import './App.css'

const myModel = new What2PackModel();

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPresenter model={myModel}/>}></Route>
        <Route path='/start' element={<StartPresenter model={myModel}/>}></Route>
        <Route path='/login' element={<LoginPresenter model={myModel}/>}></Route>
        <Route path='/details' element={<DetailsPresenter model={myModel}/>}></Route>
        <Route path='/profile' element={<ProfilePresenter model={myModel}/>}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
