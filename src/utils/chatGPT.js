import axios from 'axios'
const processMessageInputToChatGPT = async(chatMessages) => { 
  // messages is an array of messages
  // Format messages for chatGPT API
  // API is expecting objects in format of { role: "user" or "assistant", "content": "message here"}
  // So we need to reformat
  const systemMessage = { 
    "role": "system", 
    "content": "In Chronicles of Verity, the player is a hero chosen by the mystical Oracle of Verity. The Oracle is in possession of a magical artifact that has the power to alter reality. The artifact has been stolen, and it's up to the player to recover it and restore balance. Speak like a narrator in an adventure genre story with the first sentence describing the scene and always end your response with a question for the user to keep the story going. End the game after 18 exchanges with the user."
  }

  let formattedMessages = chatMessages.map((messageObject) => {
    let role = "";
    if (messageObject.sender === "ChatGPT") {
      role = "assistant";
    } else {
      role = "user";
    }
    return { role: role, content: messageObject.message}
  });

  return [systemMessage, ...formattedMessages]
}

const sendChatGPT = async(messagesArray) => {
  const api_key = process.env.REACT_APP_OPENAI_API_KEY;
  const apiRequestBody = {
    "model": "gpt-3.5-turbo",
    "messages": messagesArray
  }
  try{
    const response = await axios.post("https://api.openai.com/v1/chat/completions",apiRequestBody,{
      headers: {
        "Authorization": "Bearer " + api_key,
        "Content-Type": "application/json"
      }
    })
    if (response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content
    } else {
      throw new Error("No response from ChatGPT")
    }
  }catch(e){
    console.log(e.message)
    return "ChatGPT has no response to that"
  }
}

export const getResponseFromChatGPT = async(chatMessages) => {
  const messagesArray = await processMessageInputToChatGPT(chatMessages)
  const response = await sendChatGPT(messagesArray)
  return response
}