import {Box,Heading} from '@chakra-ui/react';
import LoginModalComponent from './LoginModalComponent';

const PenaltyRewardPage = ({account, setAccount, userBalance, setUserBalance,rewardAmt, setRewardAmt, reviveAmt, setReviveAmt}) => {
  const imgMapping = {
    revive: require('../assets/GameLandingBgImg.png'),
    reward: null,
  }
  
  return (
    <>
      <Box
        style={{
          position: 'absolute',
          top: '40%',
          background: 'rgba(0, 0, 0,0.6)',
          padding: '20px 10px',
          borderRadius: '20px',
          width:'1000px',
          height: 'fit-content'
        }}
      >
        {
          reviveAmt && reviveAmt > 0 ?
            <Heading
              style={{
                color:'white'
              }}
            >You have died, you will need to pay {reviveAmt} essence to revive and continue</Heading>
          : null
        }
        {
          rewardAmt && rewardAmt > 0 ?
            <Heading
              style={{
                color:'white'
              }}
            >Congratulations! You have cleared the staged and you have been rewarded with {rewardAmt} essence</Heading>
          : null
        }
      </Box>
      {
        rewardAmt || reviveAmt ?
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
        <LoginModalComponent account={account} setAccount={setAccount} userBalance={userBalance} setUserBalance={setUserBalance} rewardAmt={rewardAmt} setRewardAmt={setRewardAmt} reviveAmt={reviveAmt} setReviveAmt={setReviveAmt}/>
        </>
        : null
      }
    </>
  );
};

export default PenaltyRewardPage;