import {useContext, useState,useEffect} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
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
  Box, 
  Text,
  MenuButton,
  CircularProgress,
  SkeletonCircle
} from '@chakra-ui/react';


function App() {
  const [name, setName] = useState(null);
  const [town, setTown] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [location, setLocation] = useState(null);
  const [account, setAccount] = useState("");
  const [userBalance, setUserBalance] = useState(0);
  const [displayBalance, setDisplayBalance] = useState(0);
  const [rewardAmt, setRewardAmt] = useState(0);
  const [reviveAmt, setReviveAmt] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast()

  const router = createBrowserRouter([
    { path: '/', element: <LandingPage account={account} setAccount={setAccount} userBalance={userBalance} setUserBalance={setUserBalance} rewardAmt={rewardAmt} setRewardAmt={setRewardAmt} reviveAmt={reviveAmt} setReviveAmt={setReviveAmt} setIsLoading={setIsLoading} isLoading={isLoading} setErrorMessage={setErrorMessage} /> },

    { path: '/prologue', element: <Prologue name={name} setName={setName} town={town} setTown={setTown} occupation={occupation} setOccupation={setOccupation} setLocation={setLocation}/> },

    { path: '/storyline', element: <Storyline name={name} town={town} setIsLoading={setIsLoading} isLoading={isLoading} balance={userBalance} setBalance={setUserBalance} occupation={occupation} location={location}/> },

    { path: '/revive', element: <PenaltyRewardPage account={account} setAccount={setAccount} userBalance={userBalance} setUserBalance={setUserBalance} rewardAmt={rewardAmt} setRewardAmt={setRewardAmt} reviveAmt={2} setReviveAmt={setReviveAmt} setIsLoading={setIsLoading} isLoading={isLoading} setErrorMessage={setErrorMessage} /> },
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
    <div className="App font-turret">      
      <EtherealEssenceBalance balance={userBalance}/>
      {isLoading ? 
      <SkeletonCircle size='100'/> : null}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

