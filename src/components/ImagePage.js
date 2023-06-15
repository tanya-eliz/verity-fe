import {
    ChakraProvider,
    Heading,
    Container,
    Text,
    Input,
    Button,
    Wrap,
    Stack, 
    Image,
    Link,
    SkeletonCircle,
    SkeletonText,
  } from "@chakra-ui/react";
import axios from "axios";
import React, { useState,useEffect } from 'react';
import Storyline from "./Storyline";

  function ImageGenerator({message}) {
    const [image, updateImage] = useState();
    // const [prompt, updatePrompt] = useState();
    const [loading, updateLoading] = useState();

    useEffect(() => {
      if (message.length){
        const firstSentence = message.split(".")[0];
        const getImageFromDreamStudio = async (message) => {
          const engineId = 'stable-diffusion-xl-beta-v2-2-2'
          const apiHost = process.env.API_HOST ?? 'https://api.stability.ai'
          const apiKey = process.env.API_KEY ?? 'sk-yhNVEmqqiozGdapzKP02DW9jJDqBS8lyYwq7xceEXVLcnIrn'
          if (!apiKey) throw new Error('Missing Stability API key.')
      
          try {
            const {data} = await axios.post(`${apiHost}/v1/generation/${engineId}/text-to-image`,
              {
                text_prompts: [
                  {
                    text: message,
                    weight: 0.5
                  },
                ],
                cfg_scale: 7,
                clip_guidance_preset: 'FAST_BLUE',
                height: 512,
                width: 512,
                samples: 1,
                steps: 50,
                style_preset: 'fantasy-art'
              },{
                headers: {
                  'Content-Type': 'application/json',
                  Accept: 'application/json',
                  Authorization: `Bearer ${apiKey}`,
                }
              })
            console.log(data);
            const artifacts = data['artifacts']
            console.log(artifacts);
            return artifacts[0].base64
          } catch (error) {
            console.log(error);
          }
        }
        const generate = async (message) => {
          updateLoading(true);
          // const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
          const result = await getImageFromDreamStudio(message)
          updateImage(result);
          updateLoading(false);
        };
        generate(firstSentence);
      }
    }, [message]);

  
    return (
      <ChakraProvider>
        <Container>
          {/* <Heading marginBottom={"10px"}>Stable Diffusion🚀</Heading> */}
          
          {/* <Wrap marginBottom={"10px"}>
            <Input
              value={prompt}
              onChange={(e) => updatePrompt(e.target.value)}
              width={"350px"}
            ></Input>
            <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
              Generate
            </Button>
          </Wrap> */}

          {loading ? (
            <Stack>
              <SkeletonCircle />
              <SkeletonText />
            </Stack>
          ) : image ? (
            <Image
              src={`data:image/png;base64,${image}`}
              boxShadow="lg"
              style={{
                height: '100%',
                width: 'auto',
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: -2,
              }}
            />
            ): null}
        </Container>
      </ChakraProvider>
    );
  };
  
  export default ImageGenerator;
