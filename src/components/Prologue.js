import React,{ useState } from 'react';
import {Box, Button, ChakraProvider, Heading, Show, Hide, Input} from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import Typewriter from "typewriter-effect";

const Prologue = ({name,setName,country,setCountry,occupation,setOccupation}) => {
  const [step,setStep] = useState(0);
  const story = [
    {
      text: "In the land of Verity, harmony was kept by the Oracle and their mystical Eye. But when the Eye was stolen, the world began to unravel. Rivers flowed with confusion, forests lost their color, and people wandered aimlessly.",
      image: require('../assets/GameLandingBgImg.png'),
      audio: "",
      input: null,
    },
    {
      text: "You, an ordinary citizen, suddenly receive a fleeting vision, a cryptic glimpse of another world. The Oracle has passed their fragmented visions onto you. With these brief flickers as your guide, you are Verity's only hope to restore balance.",
      image: "",
      audio: "",
      input: null,
    },
    {
      text: "Your quest begins. You must traverse a world in chaos, find the stolen Eye, and restore the Oracle's sight. Welcome to the Chronicles of Verity. Your adventure starts now…",
      image: "",
      audio: "",
      input: null,
    },
    {
      text: "As the final echoes of the Oracle's vision fade, you find yourself standing in the heart of your humble village. The morning sun casts long shadows, and the normally bustling village square is eerily quiet. The world feels different, sounds distant, as if you're standing on the brink of a great change.",
      image: "",
      audio: "",
      input: null,
    },
    {
      text: "Suddenly, from the corner of the square, a figure emerges. It's Elder Elara, the oldest and wisest person in your village, known for her tales of old and her connection to the Oracle.",
      image: "",
      audio: "",
      input: null,
    },
    {
      text: "She walks towards you, her wise eyes twinkling with a knowing gaze. Her voice, usually frail with age, resonates with strange energy as she speaks, \"I felt a tremor in the fabric of Verity. It led me to you. You have been chosen, and you may be the savior to these lands. But first, we must know... what name do you carry, traveler?\"",
      image: "",
      audio: "",
      input: "name",
    },
    {
      text: "She pauses, studying your face before continuing, \"And what land do you call home?\"",
      image: "",
      audio: "",
      input: "country",
    },
    {
      text: "She nods, a glimmer of understanding passing through her eyes. But there's one more question lingering in the air. She asks, \"So, what is your calling? Are you a Mage, with power drawn from the secrets of the universe? Or a Warrior, with strength to overcome the greatest of odds? Or perhaps, you're a Healer, with a heart to mend what's broken in our world?\"",
      image: "",
      audio: "",
      input: "occupation",
      option: ["Mage", "Warrior", "Healer"]
    },
    {
      text: "Elara nods, \"So it shall be. Your journey begins, and Verity is in your hands.” Elara gazes into the distance, her eyes reflecting the many paths that lay ahead. She turns back to you and her voice, filled with the weight of the decision you're about to make, breaks the silence.\"The path of Verity diverges into three, each leading to a different corner of our world, each holding a piece of the puzzle,\" she says, \"The choice is yours, and it will shape your journey.\"",
      image: "",
      audio: "",
      input: null,
    },
    {
      text: "The Crystal Caverns: Hidden deep within the heart of the mountains lie the Crystal Caverns. Illuminated by luminous crystals, these caverns are known to house ancient wisdom etched in stone by the first Oracle. Beware, for the path is treacherous, and not all that glimmers is friendly.",
      image: "",
      audio: "",
      input: null,
    },
    {
      text: "The Shimmering Shores: Along Verity's edge, where the land meets the sea, are the Shimmering Shores. It is said that the sands hold the memories of time, revealing them to those who know how to listen. Yet, the tides are capricious, and the sea holds secrets of its own.",
      image: "",
      audio: "",
      input: null,
    },
  ]

  return (
    <>
      <ChakraProvider>
        {
          story.map(({text,image,audio,input,option},index) => {
            const i = image
            return (
              <>
                {
                  step === index &&
                  <Box
                    style={{
                      backgroundImage: image.length ? `image-set(url(${image}))` : '',
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
                  >
                    <Box
                      style={{
                        position: 'absolute',
                        top: '50%',
                        background: 'rgba(255, 255, 255,0.6)',
                        padding: '20px 10px',
                        borderRadius: '20px',
                      }}
                    >
                      <Typewriter delay={0} onInit={(typewriter) => { typewriter.typeString(text).start() }}/>
                    </Box>
                  </Box>
                }
              </>
            )
          })
        }
        <Button onClick={()=>setStep(step+1)}>Next</Button>
      </ChakraProvider>
    </>
  )
}
export default Prologue;