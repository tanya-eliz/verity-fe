import {useContext, useState,useEffect} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, useLocation } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';

import LoginModalComponent from './components/LoginModalComponent';
import Storyline from './components/Storyline';
import FragmentEffect from './components/FragmentEffect';
import Prologue from './components/Prologue';
import PenaltyRewardPage from './components/PenaltyRewardPage';
import EtherealEssenceBalance from "./components/EtherealEssenceBalance";
import {
  useToast,
  Spinner,
} from '@chakra-ui/react';
import axios from 'axios';

function App() {
  const [name, setName] = useState(null);
  const [town, setTown] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [account, setAccount] = useState("");
  const [userBalance, setUserBalance] = useState(null);
  const [rewardAmt, setRewardAmt] = useState(0);
  const [reviveAmt, setReviveAmt] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()

  const router = createBrowserRouter([
    { path: '/', element: <LandingPage account={account} setAccount={setAccount} userBalance={userBalance} setUserBalance={setUserBalance} rewardAmt={rewardAmt} setRewardAmt={setRewardAmt} reviveAmt={reviveAmt} setReviveAmt={setReviveAmt} setIsLoading={setIsLoading} isLoading={isLoading} setErrorMessage={setErrorMessage} /> },

    { path: '/prologue', element: <Prologue name={name} setName={setName} town={town} setTown={setTown} occupation={occupation} setOccupation={setOccupation}/> },

    { path: '/storyline', element: <Storyline name={name} town={town} setIsLoading={setIsLoading} isLoading={isLoading}/> },

    { path: '/claim-reward', element: <PenaltyRewardPage account={account} setAccount={setAccount} userBalance={userBalance} setUserBalance={setUserBalance} rewardAmt={2} setRewardAmt={setRewardAmt} reviveAmt={reviveAmt} setReviveAmt={setReviveAmt} setIsLoading={setIsLoading} isLoading={isLoading} /> },

    { path: '/revive', element: <PenaltyRewardPage account={account} setAccount={setAccount} userBalance={userBalance} setUserBalance={setUserBalance} rewardAmt={rewardAmt} setRewardAmt={setRewardAmt} reviveAmt={2} setReviveAmt={setReviveAmt} setIsLoading={setIsLoading} isLoading={isLoading} /> },
  ])

  useEffect(() => {
    if (errorMessage && errorMessage.length > 0)
    toast({
      title: "An error occurred.",
      description: errorMessage,
      status: "error",
      duration: 5000,
      isClosable: true,
    })
  },[errorMessage])

  return (
    <div className="App">
      {
        userBalance && userBalance>0?
        <EtherealEssenceBalance displayBalance={userBalance}/>
        : <EtherealEssenceBalance displayBalance={0}/>
      }
      {isLoading ?
        <Spinner size="xl" />
      : null
      }
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

