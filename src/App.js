import {useContext, useState,useEffect} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import GamePage from './components/GamePage';
import { ethers } from "ethers";
import {
  VerityTokenABI,
  FaucetABI,
  VerityTokenAddress,
  FaucetAddress,
} from "./constants";

import LoginModalComponent from './components/LoginModalComponent';
// import FaucetComponent from './components/FaucetComponent';
import ImageGenerator from './components/ImagePage';
import Storyline from './components/Storyline';

function App() {
  const router = createBrowserRouter([
    { path: '/landing', element: <LandingPage/> },
    { path: '/begin', element: <GamePage/> },
    { path: '/', element: <ImageGenerator/> },
    { path: '/storyline', element: <Storyline/> }
  ])

  return (
    <div className="App">
      <LoginModalComponent />
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

