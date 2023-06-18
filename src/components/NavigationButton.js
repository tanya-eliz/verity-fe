import {
  useToast,
  Spinner,
  Box, 
  Text,
  MenuButton
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

const NavigationButton = () => {
  const navigate = useNavigate();
  const handler = () => {
    navigate('/')
    window.location.reload();
  }
  return(
    <Box 
      style={{
        backgroundColor: 'rgba(0, 0, 0,0.3)',
        position: 'absolute',
        padding: '10px 20px',
        borderRadius: '10px',
        top: 10,
        left:10,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
      }}
      role="button"
      onClick={handler}
    >
      <Text style={{color: "white"}}> Back To Home </Text>
    </Box>
  )
}

export default NavigationButton;