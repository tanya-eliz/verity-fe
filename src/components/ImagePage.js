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
import testbgImage from "../assets/testbg.jpeg";
import fragmentImage from "../assets/fragment.png";
import smallFragment from "../assets/smallFragment.png";
import { getImageFromDreamStudio } from "../utils/imageGeneration";

function ImageGenerator({message}) {
const [image, updateImage] = useState();
const [loading, updateLoading] = useState();


const generate = async (message) => {
    const result = await getImageFromDreamStudio(message)
    updateImage(result);
};

useEffect(() => {
    if (message && message.length > 0){
        const parts = message.split(".")
        const sentence = `${parts[0]}.${parts[1] || ''}`
        generate(sentence);
    }
}, [message]);


return (
<ChakraProvider>
    {
    loading ? (
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
    ): 
    <Box
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
    />
}
</ChakraProvider>
);
};

export default ImageGenerator;