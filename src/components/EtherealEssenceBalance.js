import {Box, Text, Avatar} from '@chakra-ui/react';
import essence from '../assets/icons/essence.png';

const EtherealEssenceBalance = ({displayBalance}) => {
  // TODO: This balance doesnt persist once you restart the game, this is a future implementation. Currently is a placeholder
  return (
    <Box 
    style={{
      backgroundColor: 'rgba(0, 0, 0,0.3)',
      position: 'absolute',
      padding: '10px 20px',
      borderRadius: '10px',
      top: 10,
      right:10,
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
    }}
    >
    <Text style={{
      color: "white",
    }}>Essence: {Number(displayBalance).toFixed(2)}&nbsp;</Text>
    <Avatar src={essence} w={20} h={20} borderRadius="full"/>
    </Box>
  )
};

export default EtherealEssenceBalance;