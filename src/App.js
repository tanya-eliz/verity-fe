import {useState,useEffect} from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPage from './components/LandingPage.js';
import GamePage from './components/GamePage';

function App() {
  const router = createBrowserRouter([
    { path: '/', element: <LandingPage/> },
    { path: '/begin', element: <GamePage/> },
  ])
  // const navigate = useNavigate();
  // useEffect(() => {
  //   if (gameState) {
  //     navigate('/');
  //   }
  // }, [gameState]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
