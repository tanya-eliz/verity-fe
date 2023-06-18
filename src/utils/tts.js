import axios from 'axios';

const ttsQuery = async (text) => {
  const api_key = process.env.REACT_APP_ELEVENLAB_API_KEY;
  const voice_id = '2gTu4913TQCElJfi8BTW' //TODO: Update this with your desired voice id, you can customise this in the web GUI
  
  try {
    const response = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`,
    {
      "text": text,
      "model_id": "eleven_monolingual_v1",
      "voice_settings": {
        "stability": 0.5,
        "similarity_boost": 0.5
      }
    },
    {
      headers: {
        'xi-api-key': api_key,
      },
      responseType: 'blob'
    })
    return response.data;
  } catch (err) {
    console.log(err.message);
  }
}

export const playAudio = async(textResponse) => {
  const data = await ttsQuery(textResponse)
  new Audio(URL.createObjectURL(data)).play();
}

