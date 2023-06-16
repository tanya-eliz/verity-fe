import {
    ChakraProvider,
    Heading,
    Container,
    Box,
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
import testbgImage from "./testbg.jpeg";
import fragmentImage from "./fragment.png";
import smallFragment from "./smallFragment.png";

function ImageGenerator({message}) {
const [image, updateImage] = useState();
// const [prompt, updatePrompt] = useState();
const [loading, updateLoading] = useState();

useEffect(() => {
    if (message && message.length){
    const firstSentence = message.split(".")[0]+message.split(".")[1];
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
                weight: 0.8
                },
            ],
            cfg_scale: 7,
            clip_guidance_preset: 'FAST_BLUE',
            height: 512,
            width: 704,
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
        const result = await getImageFromDreamStudio(message)
        updateImage(result);
        updateLoading(false);
    };
    generate(firstSentence);
    }
}, [message]);


return (
<ChakraProvider>
    {loading ? (
    <Stack
    style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        top:'50%',
        paddingInline:'5%'
    }}
    >
        <SkeletonCircle />
        <SkeletonText/>
    </Stack>
    ) : image ? (
    <Box
        // src={`data:image/png;base64,${image}`}
        boxShadow="lg"
        style={{
            position: "absolute",
            width: "100%",
            height: "100vh",
            backgroundImage: `url(data:image/png;base64,${image}), url(${fragmentImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat, no-repeat",
            backgroundBlendMode: "multiply"
            }}
    />
    ): <Box
    // src={`data:image/png;base64,${image}`}
    boxShadow="lg"
    style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${smallFragment}), url(${fragmentImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat, no-repeat",
        backgroundBlendMode: "multiply"
        }}
/>}
    </ChakraProvider>
);
};

export default ImageGenerator;