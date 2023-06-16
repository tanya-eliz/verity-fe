import axios from 'axios';

const ttsQuery = async (text) => {
  const api_key = '8e8a45cb471585d768d8efc9c671c9da';
  try {
    const response = await axios.post(`https://api.elevenlabs.io/v1/text-to-speech/2gTu4913TQCElJfi8BTW`,
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
// const ttsQuery = async (text) => {
//   const api_key = 'AIzaSyAVRCUurwrkV-GNogNQS93kBgMmZBiRAcA';
//   try {
//     const response = await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${api_key}`, {
//       input: {
//         text: text
//       },
//       voice:{
//         "languageCode":"en-gb",
//         "name":"en-GB-Standard-A",
//         "ssmlGender":"FEMALE"
//       },
//       audioConfig:{
//         "audioEncoding":"MP3"
//       }
//     })
//     return response.data.audioContent;
//   } catch (err) {
//     console.log(err.message);
//   }
// }

// const formatBase64ToAudio = (base64AudioStr) => {
//   return new Audio(`data:audio/mpeg;base64,${base64AudioStr}`)
// }

// const formatBinaryToBlob = (data) => {
//   return new Blob([data], {type: 'audio/mpeg'})
// }


export const playAudio = async(textResponse) => {
  const data = await ttsQuery(textResponse)
  new Audio(URL.createObjectURL(data)).play();
}
