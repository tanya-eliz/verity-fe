import { useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate("/begin")
  }

  return (
    <div>
      <h1>Welcome to My Game</h1>
      <button onClick={handleClick}>Start Game</button>
    </div>
  );
}

export default LandingPage;