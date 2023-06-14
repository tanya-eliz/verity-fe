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
  import React, { useState } from 'react';
  
  function ImageGenerator() {
    const [image, updateImage] = useState();
    const [prompt, updatePrompt] = useState();
    const [loading, updateLoading] = useState();
  
    const generate = async (prompt) => {
      updateLoading(true);
      const result = await axios.get(`http://127.0.0.1:8000/?prompt=${prompt}`);
      console.log("hi");
      console.log(result.data);
      updateImage(result.data);
      updateLoading(false);
    };
  
    return (
      <ChakraProvider>
        <Container>
          <Heading marginBottom={"10px"}>Stable Diffusion🚀</Heading>
          
          <Wrap marginBottom={"10px"}>
            <Input
              value={prompt}
              onChange={(e) => updatePrompt(e.target.value)}
              width={"350px"}
            ></Input>
            <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
              Generate
            </Button>
          </Wrap>
  
          {loading ? (
            <Stack>
              <SkeletonCircle />
              <SkeletonText />
            </Stack>
          ) : image ? (
            <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
          ) : null}
        </Container>
      </ChakraProvider>
    );
  };
  
  export default ImageGenerator;
