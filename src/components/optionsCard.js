import { Box, Text, Image } from '@chakra-ui/react';

const OptionsCard = ({url, optionName, handleClick}) => {
    return (
        <Box
            maxW="xs"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="lg"
            padding="0px"
            mx={2}
            my={5}
            cursor="pointer"
            className="cs-message__content"
            onClick={handleClick}
        >
            <Image src={url} alt="Card image" />
            <Text style={{
                padding: '10px',
                display: "inline-block",
                color: "white",
                fontSize: "1.5rem",
                fontWeight: "bold",
            }}>{optionName}</Text>
        </Box>
    );
};

export default OptionsCard