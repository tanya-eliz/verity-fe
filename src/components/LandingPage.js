import { useNavigate } from "react-router-dom";
import {useState} from 'react';
import {Box, Button, ChakraProvider, Heading, Show, Hide, Input} from "@chakra-ui/react";
const LandingPage = ({name,setName,town,setTown}) => {
  const navigate = useNavigate();
  const [step,setStep] = useState(0);

  const handleClick = () => {
    if (name && town) navigate("/storyline")
    else if (name) setStep(2)
    else setStep(1)
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
          {
            step === 0 ? 
            <>
              <Heading>Welcome Adventurer{name ? ` name` : ""}!</Heading>
            </> :
            step === 1 ?
            <>
              <Heading>Please Enter Your Name!</Heading>
              <Input id={1} placeholder="Enter your name" onChange={(e) => setName(e.target.value)}/>
            </> :
            step === 2 ?
            <>
              <Heading>Please Enter Your Town!</Heading>
              <Input id={2} placeholder="Enter your town" onChange={(e) => setTown(e.target.value)}/>
            </> :
            null
          }
          <Button onClick={handleClick}>{step === 0 ? "Start Game" : step === 1 ? "Next" : "Let's Go"}</Button>
        </Box>
      </ChakraProvider>
    </>
  );
}

export default LandingPage;