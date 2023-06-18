# Chronicles of Verity
## Project Vision
"Chronicles of Verity" is an innovative, text-based, choose-your-own-adventure game set in the mystical world of Verity, thrown into chaos by the theft of the Eye of Verity. Players assume the role of an ordinary citizen chosen by the Oracle, guided by brief, fragmented visions, or 'flickers.' 

The gameplay is decision-driven, with each choice shaping the narrative, leading the player through diverse landscapes which provides the player's NFT with experience in the form of Ethereal Essence - unlocking more dangerous paths. 

<hr/>

## Implementation:
In this MVP version, we have implemented the following features:
1) Connecting to Metamask Wallet and Retrieving ERC20 Token Balance, including functions to request for daily rewards and deduction of tokens if they 'die'
2) Integration of ChatGPT to generate text-based responses to user input, orchestrating API calls to DreamStudio and ElevenLabs based on response by ChatGPT to generate the visual and audio aspect of the gameplay.

## Requirements
To get started, you first need to create the following API keys:
1) [ElevenLabs (Speech Synthesis AI)](https://beta.elevenlabs.io/speech-synthesis)
2) [DreamStudio (Image Generation AI)](https://platform.stability.ai/docs/getting-started/authentication)
3) [OpenAI (ChatGPT)](https://platform.openai.com/account/api-keys)

Duplicate the `.env.example` file in your project root directory, rename it to `.env` and update the API keys accordingly.

As the project currently only supports metamask login, please make sure you have metamask installed in your browser and that you are connected to the POLYGON MUMBAI testnet and that you have some testnet tokens in your wallet. You can retrieve them from this [faucet](https://mumbaifaucet.com/)
## Installation

- Installing the required Dependencies: `npm install`

- Run the web server in development mode: `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
The page will reload when you make changes.\
You may also see any lint errors in the console.

## Smart Contract Implementation
[Smart Contract](./smart_contract)

<hr>

## Contributors:
1) [Tanya](https://github.com/tanya-eliz)
2) [Shen Jie](https://github.com/sjng1234)
