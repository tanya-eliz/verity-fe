import React from "react";
import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import LoginModalComponent from './LoginModalComponent'
import {Box, Button, ChakraProvider, Heading, Show, Hide, Input} from "@chakra-ui/react";
import testbgImage from "./testbg.jpeg";
import fragmentImage from "./fragment.png";

const LandingPage = ({account, setAccount, userBalance, setUserBalance,rewardAmt, setRewardAmt, reviveAmt, setReviveAmt}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/prologue")
  }

  return (
    <>
    <Box
      style={{
        backgroundImage: `image-set(url(${require('../assets/GameLandingBgImg.png')}))`,
        position: 'absolute',
        backgroundSize: 'cover',
        left: 0,
        top: 0,
        width: '100%',
        height: '100vh',
        zIndex: -100,
        border: 0,
        margin: 0
      }}
    />
    {
      account.length && userBalance && userBalance>0 ? 
        <>
          <ChakraProvider>
            <Box
              style={{
                position: 'absolute',
                top: '50%',
                background: 'rgba(255, 255, 255,0.6)',
                padding: '20px 10px',
                borderRadius: '20px',
              }}
            >
              <Button onClick={handleClick}>Start Game</Button>
            </Box>
          </ChakraProvider>
        </>
      : null  
    }
    <LoginModalComponent account={account} setAccount={setAccount} userBalance={userBalance} setUserBalance={setUserBalance} rewardAmt={rewardAmt} setRewardAmt={setRewardAmt} reviveAmt={reviveAmt} setReviveAmt={setReviveAmt}/>
    </>
  );
}

export default LandingPage;

