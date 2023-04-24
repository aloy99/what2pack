import {Routes, Route} from 'react-router-dom';
import StartPresenter from './reactjs/startPresenter.jsx';
import DetailsPresenter from './reactjs/detailsPresenter.jsx';
import ProfilePresenter from './reactjs/profilePresenter.jsx';
import What2PackModel from './What2PackModel';
import './App.css';
import AuthPresenter from './reactjs/authPresenter.jsx';
import Navbar from './views/Navbar.jsx';

const myModel = new What2PackModel();

function App() {
  return (
    <>
    <Navbar />
    {/* <div className="nav-container"> */}
      <Routes>
        <Route path='/' element={<StartPresenter model={myModel}/>}></Route>
        <Route path='/start' element={<StartPresenter model={myModel}/>}></Route>
        <Route path='/login' element={<AuthPresenter model={myModel}/>}></Route>
        <Route path='/details' element={<DetailsPresenter model={myModel}/>}></Route>
        <Route path='/profile' element={<ProfilePresenter model={myModel}/>}></Route>
      </Routes>
      {/* </div> */}
    </>
  )
}

export default App;
