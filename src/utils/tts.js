import axios from 'axios';

const ttsQuery = async (text) => {
  const api_key = 'AIzaSyAVRCUurwrkV-GNogNQS93kBgMmZBiRAcA';
  try {
    const response = await axios.post(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${api_key}`, {
      input: {
        text: text
      },
      voice:{
        "languageCode":"en-gb",
        "name":"en-GB-Standard-A",
        "ssmlGender":"FEMALE"
      },
      audioConfig:{
        "audioEncoding":"MP3"
      }
    })
    return response.data.audioContent;
  } catch (err) {
    console.log(err.message);
  }
}

const formatBase64ToAudio = (base64AudioStr) => {
  return new Audio(`data:audio/mp3;base64,${base64AudioStr}`)
}

export const playAudio = async(textResponse) => {
  const base64Str = await ttsQuery(textResponse)
  const audioFile = formatBase64ToAudio(base64Str);
  audioFile.play();
}