import { useNavigate } from "react-router-dom";
const GamePage = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/")
  }
  return ( 
    <>
    <h1>Game Page</h1>
    <button onClick={handleClick}>End Game</button>
    </>
  );
}

export default GamePage;