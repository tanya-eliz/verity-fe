import { useNavigate } from "react-router-dom";
const GamePage = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/")
  }

  const handleClick2 = () => {
    navigate("/storyline")
  }

  return ( 
    <>
      <h1>Game Page</h1>
      <button onClick={handleClick}>Image Page</button><br></br>
      <button onClick={handleClick2}>Go to storyline</button>

      <style>
        {`
        button {
          margin-bottom: 10px; 
        }
        `}
      </style>
    </>
  );
}

export default GamePage;