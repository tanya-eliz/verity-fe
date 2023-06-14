import {useState,useEffect} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import GamePage from './components/GamePage';
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
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

