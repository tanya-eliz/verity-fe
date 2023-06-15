import {useContext, useState,useEffect} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';

import LoginModalComponent from './components/LoginModalComponent';
import Storyline from './components/Storyline';
import FragmentEffect from './components/FragmentEffect';
import Prologue from './components/Prologue';

function App() {
  const [name, setName] = useState(null);
  const [town, setTown] = useState(null);
  const [occupation, setOccupation] = useState(null);

  const router = createBrowserRouter([
    { path: '/', element: <LandingPage name={name} setName={setName} town={town} setTown={setTown}/> },
    { path: '/prologue', element: <Prologue name={name} setName={setName} town={town} setTown={setTown} occupation={occupation} setClass={setOccupation}/> },
    { path: '/storyline', element: <Storyline name={name} town={town}/> },
  ])

  return (
    <div className="App">
      <LoginModalComponent/>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

