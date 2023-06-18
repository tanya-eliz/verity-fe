import {Box, Text, Avatar} from '@chakra-ui/react';
import essence from '../assets/icons/essence.png';

const EtherealEssenceBalance = ({balance}) => {
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
      justifyContent: "center",
      zIndex: 100,
    }}
    >
    <Text style={{
        color: "white",
        cursor: "default",
      }}>Essence: {balance==0? 0.00 : balance.toFixed(2)} &nbsp;</Text>
    <Avatar src={essence} w={20} h={20} borderRadius="full"/>
    </Box>
  )
};

export default EtherealEssenceBalance;