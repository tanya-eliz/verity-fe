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
  const [account, setAccount] = useState("");
  const [userBalance, setUserBalance] = useState(null);
  const [rewardAmt, setRewardAmt] = useState(0);
  const [reviveAmt, setReviveAmt] = useState(0);

  const router = createBrowserRouter([
    { path: '/', element: <LandingPage account={account} setAccount={setAccount} userBalance={userBalance} setUserBalance={setUserBalance} rewardAmt={rewardAmt} setRewardAmt={setRewardAmt} reviveAmt={reviveAmt} setReviveAmt={setReviveAmt}/> },
    { path: '/prologue', element: <Prologue name={name} setName={setName} town={town} setTown={setTown} occupation={occupation} setOccupation={setOccupation}/> },
    { path: '/storyline', element: <Storyline name={name} town={town}/> },
  ])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

