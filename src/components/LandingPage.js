import {useState} from 'react';
import LoginModalComponent from './LoginModalComponent'
import {Box, Button, ChakraProvider, Heading, Show, Hide, Input} from "@chakra-ui/react";
const LandingPage = ({account, setAccount, userBalance, setUserBalance,rewardAmt, setRewardAmt, reviveAmt, setReviveAmt,setErrorMessage,isLoading,setIsLoading}) => {

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
    <LoginModalComponent account={account} setAccount={setAccount} userBalance={userBalance} setUserBalance={setUserBalance} rewardAmt={rewardAmt} setRewardAmt={setRewardAmt} reviveAmt={reviveAmt} setReviveAmt={setReviveAmt} isLogin={true} setErrorMessage={setErrorMessage} isLoading={isLoading} setIsLoading={setIsLoading}/>
    </>
  );
}

export default LandingPage;

