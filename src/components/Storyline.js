import { useState } from 'react'
import ImageGenerator from './ImagePage';

// will change the UI later
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';

const API_KEY = "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";

const systemMessage = { 
  "role": "system", "content": "In Chronicles of Verity, the player is a hero chosen by the mystical Oracle of Verity. The Oracle is in possession of a magical artifact that has the power to alter reality. The artifact has been stolen, and it's up to the player to recover it and restore balance. Speak like a narrator in an adventure genre story and always end your response with a question for the user to keep the story going. End the game after 18 exchanges with the user."
}

function Storyline({bgImage}) {
  const [messages, setMessages] = useState([
    {
      message: "Elara's voice fades, and the world waits for your choice. The Crystal Caverns, the Whispering Woods, or the Shimmering Shores - where will your adventure take you, xxx from xxx? ",
      sentTime: "just now",
      sender: "ChatGPT"
    }
  ]);
  const [latestResponse,setLatestResponse] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    // Initial system message to determine ChatGPT functionality
    // How it responds, how it talks, etc.
    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { // messages is an array of messages
    // Format messages for chatGPT API
    // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
    // So we need to reformat

    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "ChatGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });


    // Get the request body set up with the model we plan to use
    // and the messages which we formatted above. We add a system message in the front to'
    // determine how we want chatGPT to act. 
    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage,  // The system message DEFINES the logic of our chatGPT
        ...apiMessages // The messages from our chat with ChatGPT
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
        console.log(data); // This is the response from chatGPT
        if (data.choices && data.choices.length > 0) {
          setMessages([
            // ...chatMessages,
            {
              message: data.choices[0].message.content,
              sender: "ChatGPT"
            }
          ]);
          setLatestResponse(data.choices[0].message.content);
        }
        setIsTyping(false);
    });
  }

  return (
    <div className="App">
      <div style={{ position:"relative", height: "80vh", width: "100%"  }}>
            <div style={{height:"100%", width:"100%"}}
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="Elara is typing" /> : null}
            >
              {messages.map((message, i) => {
                console.log(message)
                console.log(i)
                
                return <Message key={i} model={message}/>
              })}
              {
                latestResponse.length>0? 
                <>
                  <ImageGenerator message={latestResponse} style={{zIndex: '-1'}} />
                </>
                : null
              }
            </div>
            <MessageInput placeholder="Type response here" onSend={handleSend} />        
 
      </div>
      
    </div>
  )
}

export default Storyline