import { useState } from 'react'
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import StartPresenter from './reactjs/startPresenter.jsx';
import SignInPresenter from './reactjs/signInPresenter.jsx';
import DetailsPresenter from './reactjs/detailsPresenter.jsx';
import ProfilePresenter from './reactjs/profilePresenter.jsx';
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<StartPresenter></StartPresenter>}></Route>
        <Route path='/start' element={<StartPresenter></StartPresenter>}></Route>
        <Route path='/signin' element={<SignInPresenter></SignInPresenter>}></Route>
        <Route path='/details' element={<DetailsPresenter></DetailsPresenter>}></Route>
        <Route path='/profile' element={<ProfilePresenter></ProfilePresenter>}></Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
