import axios from 'axios'

export const getImageFromDreamStudio = async (message) => {
  const engineId = 'stable-diffusion-xl-beta-v2-2-2' //TODO: Customise the engine id here
  const apiHost = 'https://api.stability.ai'
  const apiKey = process.env.REACT_APP_DREAMSTUDIO_API_KEY
  if (!apiKey) throw new Error('Missing Stability API key.')

  try {
  const {data} = await axios.post(`${apiHost}/v1/generation/${engineId}/text-to-image`,
      {
      text_prompts: [
          {
          text: message
          },
      ],
      cfg_scale: 7,
      clip_guidance_preset: 'FAST_BLUE',
      height: 512,
      width: 704,
      samples: 1,
      steps: 50,
      style_preset: 'fantasy-art'
      },{
      headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${apiKey}`,
      }
      })
  console.log(data);
  const artifacts = data['artifacts']
  console.log(artifacts);
  return artifacts[0].base64
  } catch (error) {
  console.log(error);
  }
}
