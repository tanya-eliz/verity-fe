import React,{ useState, useEffect } from 'react';
import {Box, Button, ChakraProvider, Heading, Show, Hide, Input, InputGroup, Stack} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import TypeWriterEffect from 'react-typewriter-effect';
import OptionsCard from './optionsCard';
import NavigationButton from './NavigationButton';
import fragmentImage from "../assets/smallFragment.png";

const Prologue = ({name,setName,town,setTown,occupation,setOccupation, setLocation}) => {
  const [step,setStep] = useState(0);
  const[audioPlaying,setAudioPlaying] = useState(null);
  const story = [
    {
      text: "In the land of Verity, harmony was kept by the Oracle and their mystical Eye. But when the Eye was stolen, the world began to unravel. Rivers flowed with confusion, forests lost their color, and people wandered aimlessly.",
      image: require('../assets/fixedScenario/IMAGE1.png'),
      audio: new Audio(require('../assets/audio/part1.mp3')),
    },
    {
      text: "You, an ordinary citizen, suddenly receive a fleeting vision, a cryptic glimpse of another world. The Oracle has passed their fragmented visions onto you. With these brief flickers as your guide, you are Verity's only hope to restore balance.",
      image: require('../assets/fixedScenario/IMAGE2.png'),
      audio: new Audio(require('../assets/audio/part2.mp3')),
    },
    {
      text: "Your quest begins. You must traverse a world in chaos, find the stolen Eye, and restore the Oracle's sight. Welcome to the Chronicles of Verity. Your adventure starts now…",
      image: require('../assets/fixedScenario/IMAGE3.png'),
      audio: new Audio(require('../assets/audio/part3.mp3')),
    },
    {
      text: "Rise, brave soul, for your destiny awaits. Welcome to the realm of Verity. Tell me, what is your name, and from which land do you hail? Are you a Mage, Warrior, or Healer?\"",
      image: "",
      audio: new Audio(require('../assets/audio/part4.mp3')),
      textInputs: ["name","country"],
      option: [
        {
          text: "Mage",
          image: require('../assets/fixedScenario/MAGE.png'),
        }, 
        {
          text: "Warrior",
          image: require('../assets/fixedScenario/WARRIOR.png'),
        }, 
        {
          text: "Healer",
          image: require('../assets/fixedScenario/HEALER.png'),
        }
      ]
    },
    {
      text: "Ah, [P_NAME] from [P_LAND]. A [P_OCCUPATION], how fortuitous. The Oracle's whispers spoke of your arrival. Your journey begins now, as you step into Verity's embrace. Remember, every choice you make shall echo through this realm. Embrace your role, [P_NAME], and let your presence shape the unfolding tapestry of Verity's destiny. May courage guide you on this adventure.",
      image: require('../assets/fixedScenario/IMAGE4.png'),
      audio: new Audio(require('../assets/audio/part5.mp3')),
    },
    {
      text: "The path of Verity diverges into three, each leading to a different corner of our world, each holding a piece of the puzzle. The choice is yours, and it will shape your journey.",
      image: "",
      audio: new Audio(require('../assets/audio/part6.mp3')),
      option: [
        {
          text: "The Crystal Caverns",
          image: require('../assets/fixedScenario/Crystal Caverns.png'),
        }, 
        {
          text: "The Whispering Woods",
          image: require('../assets/fixedScenario/Whispering Woods.png'),
        }, 
        {
          text: "The Shimmering Shores",
          image: require('../assets/fixedScenario/Shimmering Shores.png'),
        }
      ]
    }
  ]
  const navigate = useNavigate();

  useEffect(() => {
    let nextAudio = story[step].audio;
    if (audioPlaying !== null) {
      console.log(audioPlaying)
      audioPlaying.pause();
      audioPlaying.currentTime=0;
    }
    setAudioPlaying(nextAudio);
    nextAudio.play();
  },[step])

  const handleClick = () => {
    if (step === story.length-1) {
      navigate('/storyline')
    } else {
      story[step+1].audio.play();
      setStep(step+1)
    }
  }

  const replacement = (text) => {
    let newText = text;
    if (name === null) name = 'Jeff'
    if (town === null) town = 'France'
    if (occupation === null) occupation = 'Warrior'
    newText = newText.replaceAll("[P_NAME]",name);
    newText = newText.replaceAll("[P_LAND]",town);
    newText = newText.replaceAll("[P_OCCUPATION]",occupation);
    return newText;
  }

  const navigateToStory = (location) => {
    setLocation(location);
    navigate('/storyline');
  }

  return (
    <>
      <ChakraProvider>
        <NavigationButton/>
        {
          story.map(({text,image,audio,input,option},index) => {
            return (
              <div key={index}>
                {
                  step === index &&
                  <Box
                    style={{
                      boxShadow: '-6px 16px 43px -3px rgba(255, 253, 253, 0.75)',
                      WebkitBoxShadow: '-6px 16px 43px -3px rgba(255, 253, 253, 0.75)',
                      MozBoxShadow: '-6px 16px 43px -3px rgba(255, 253, 253, 0.75)',
                      backgroundImage: image.length ? `image-set(url(${image}))` : `url(${fragmentImage}`,
                      position: 'absolute',
                      backgroundSize: 'cover',
                      left: 0,
                      top: 0,
                      width: '100%',
                      height: '100vh',
                      zIndex: -100,
                      border: 0,
                      margin: 0,
                      display: 'flex',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      style={{
                        marginTop: '60px',
                        background: 'rgba(0, 0, 0,0.6)',
                        padding: '20px 10px',
                        borderRadius: '20px',
                        width:'1000px',
                        height: 'fit-content'
                      }}
                    >
                      <TypeWriterEffect
                        textStyle={{
                          color: 'white',
                          fontSize: '1.5em'
                        }}
                        hideCursorAfterText={true}
                        startDelay={100}
                        cursorColor="white"
                        text={replacement(text)}
                        typeSpeed={20}
                      />
                    </Box>
                  </Box>
                }
              </div>
            )
          })
        }
        {
          step === 3 && (
            <Box
              style={{
                position: 'absolute',
                zIndex: 100,
                top: '25%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'center',
                  
                }}
              >                
                <input className="cs-message-input" style={{
                  padding:'10px',
                  width: '100%',
                  marginRight: '10px',
                  marginTop: '10px'
                  
                  }} variant='outline' placeholder="Name" onChange={(e)=>setName(e.target.value)} />

                <input className="cs-message-input" style={{
                  padding:'10px',
                  width: '100%',
                  marginLeft: '10px',
                  marginTop: '10px'
                  }} variant='outline' placeholder="Town" onChange={(e)=>setTown(e.target.value)} />
              </div>
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {
                  story[3].option.map(({text,image},index) => {
                    return(
                      <OptionsCard 
                        key={index}
                        url={image}
                        optionName={text}
                        handleClick={() => { 
                          setOccupation(text);
                          setStep(step+1)
                        }}
                      />
                    )
                  })
                }
              </Box>
            </Box>
            
          )
        }
        {
          step === 5 && (
            <Box
              style={{
                position: 'absolute',
                zIndex: 100,
                top: '25%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                height: '50vh'
              }}
            >
              <Box
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                {
                  story[5].option.map(({text,image},index) => {
                    return(
                      <OptionsCard 
                        key={index}
                        url={image}
                        optionName={text}
                        handleClick={() => { 
                          navigateToStory(text)
                        }}
                      />
                    )
                  })
                }
              </Box>
            </Box>
            
          )
        }
        {
          step !== 3 && step !== 5 ?
            <Button 
              onClick={handleClick}
              className="cs-button--send"
              style={{
                zIndex: 100,
                position: "absolute",
                bottom: '20%',
              }}
            >{step<(story.length-1) ? 'Next' : 'Proceed'}</Button>
          : null
        }
      </ChakraProvider>
    </>
  )
}
export default Prologue;