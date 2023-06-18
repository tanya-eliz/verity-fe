import { useState, useEffect } from 'react';
import ImageGenerator from './ImagePage';
import {playAudio} from '../utils/tts';
import {getResponseFromChatGPT} from '../utils/chatGPT'; 
import NavigationButton from './NavigationButton';

// will change the UI later
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';


function Storyline({bgImage,name,town,occupation,location,balance,setBalance}) {
  const [messages, setMessages] = useState([
    {
      message: `Welcome, brave ${name} hailing from the mystical town of ${town}. You find yourself standing at the entrance of ${location}, a realm steeped in magic and mystery. Two paths emerge before you, will you venture down the path to the right or the path to the left? Choose wisely, for your fate awaits.`,
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [latestResponse,setLatestResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [lastResponseBy, setLastResponseBy] = useState("system");

  const etherealEssenceDrops = () => {
    return Number((Math.floor(Math.random() * 3) + 1)/10);
  }

  useEffect(()=>{
    if (latestResponse && latestResponse !== "") {
      playAudio(latestResponse);
      setBalance(balance+etherealEssenceDrops());
    } else {
      playAudio(messages[0].message);
    }
  },[latestResponse])

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const curMessages = [...messages, newMessage];
    setMessages(curMessages);
    setLastResponseBy("user");
    setIsTyping(true);
    try{
      const response = await getResponseFromChatGPT(curMessages);
      setLatestResponse(response);
      const newMessage = {
        message: response,
        sender: "ChatGPT"
      };
      const newMessages = [...messages, newMessage];
      setMessages(newMessages);
      setIsTyping(false);
      setLastResponseBy("system");
    }catch(err){
      console.log(err);
    }
  };

  return (
    <>
      <NavigationButton />
      {
        latestResponse.length>0? 
        <ImageGenerator message={latestResponse} style={{zIndex: '-1'}} />
        : <ImageGenerator message={messages[0].message} style={{zIndex: '-1'}} />
      }
      <div style={{position:"relative", height: "80vh", marginTop: '5%', paddingInline:'5%', width: "100%", fontStyle: 'bold'}}>
            <div style={{height:"100%", width:"100%"}}
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Elara is typing" /> : null}
            >
              {
                lastResponseBy === "system" ? 
                  <Message model={messages[messages.length-1]}/> 
                : lastResponseBy === "user" ?
                  <>
                    <Message model={messages[messages.length-2]}/>
                    <Message model={messages[messages.length-1]}/>
                  </>
                : null
              }
            </div>
            <MessageInput 
            style={{ background:'transparent !important'}}
            attachButton={false}
            placeholder="Type response here" onSend={handleSend} />        
      </div>
    </>
  )
}

export default Storyline