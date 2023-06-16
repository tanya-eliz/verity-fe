import React, {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";
import {ethers, BigNumber} from 'ethers'
import {
  VerityTokenABI,
  FaucetABI,
  VerityTokenAddress,
  FaucetAddress,
} from "../constants";
import {
	ChakraProvider,
	Box,
	Heading,
	Container,
	Text,
	Input,
	Button,
	Wrap,
	Stack, 
	Image,
	Link,
	SkeletonCircle,
	SkeletonText,
	Badge
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";

const LoginModalComponent = ({account,setAccount, userBalance, setUserBalance, rewardAmt, setRewardAmt, reviveAmt, setReviveAmt, isLogin, setErrorMessage, isLoading, setIsLoading}) => {  
	const [loggedInClicked,setLoggedInClicked] = useState(false);
	const [userMaticBalance, setUserMaticBalance] = useState(0);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [ttkContract, setTtkContract] = useState(null);
	const [faucetContract, setFaucetContract] = useState(null);
	const [requestFaucetPrompt, setRequestFaucetPrompt] = useState(false);

	useEffect(() => {
		try {
			let providerInit = new ethers.providers.Web3Provider(window.ethereum)
			let signerInit = providerInit.getSigner();
			let ttkContractInit = new ethers.Contract(VerityTokenAddress, VerityTokenABI, signerInit);
			let faucetContractInit = new ethers.Contract(FaucetAddress, FaucetABI, signerInit);
			setProvider(providerInit);
			setSigner(signerInit);
			setTtkContract(ttkContractInit);
			setFaucetContract(faucetContractInit);
			window.ethereum.on('accountsChanged', accountChangedHandler);
			window.ethereum.on('chainChanged', chainChangedHandler);
		}catch (e) {
			setErrorMessage(e.message);
		}
	}, [window.ethereum]);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([
		checkContractForBalance(account),
		checkAccountMaticBalance(account)
		]).then(() =>
		setIsLoading(false)
		);
	}, [account]);

	const resetState = () => {
		window.location.reload();
	}

	const connectWalletHandler = async () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			try {
				await checkNetwork();
				await accountChangedHandler();
			} catch (err) {
				setErrorMessage(err.message);
			}
		} else {
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	const getCurrentAccount = async() => {
		try {
			const wallets = await window.ethereum.request({ method: 'eth_accounts' });
			if (wallets.length) {
				return wallets[0];
			}
			throw new Error('No Wallet Found')
		}catch(err) {
			setErrorMessage(err.message);
			return null
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = async () => {
		try {
			const newAccount = await getCurrentAccount();
			if (newAccount) {
				setAccount(newAccount);
				setConnButtonText('Logout');
			} else {
				resetState();
			}
		} catch (err) {
			setErrorMessage(err.message);
		}
	}

	// set smart contract address to TTK address
	const updateTargetSmartContractAddressOfFaucet = async () => {
		try {
			await faucetContract.setTokenAddress(VerityTokenAddress);
		} catch (err) {
			setErrorMessage(err.message);
		}
	}

	// check contract for balance
	const checkContractForBalance = async (account) => {
		if (account) {
			try {
				const balance = await ttkContract.balanceOf(account);
				setUserBalance(ethers.utils.formatEther(balance));
			} catch (err) {
				setUserBalance(ethers.utils.formatEther(0));
				setRequestFaucetPrompt(true);
			}
		}
	}

	async function getPermitSignature(signer, account, token, spender, value, deadline) {
		signer = provider.getSigner()
		const [nonce, name, version, chainId] = await Promise.all([
			token.nonces(account),
			token.name(),
			"1",
			signer.getChainId(),
		])	
		return ethers.utils.splitSignature(
			await signer._signTypedData(
				{
					name,
					version,
					chainId,
					verifyingContract: token.address,
				},
				{
					Permit: [
						{
							name: "owner",
							type: "address",
						},
						{
							name: "spender",
							type: "address",
						},
						{
							name: "value",
							type: "uint256",
						},
						{
							name: "nonce",
							type: "uint256",
						},
						{
							name: "deadline",
							type: "uint256",
						},
					],
				},
				{
					owner: account,
					spender,
					value,
					nonce,
					deadline,
				}
			)
		)
	}

	async function depositWithPermit(qty){
		const amount = ethers.utils.parseEther(Number(qty).toString());
		try {
			const deadline = ethers.constants.MaxUint256;
			const { v, r, s } = await getPermitSignature(
				signer,
				account,
				ttkContract,
				FaucetAddress,
				amount,
				deadline
			)
			await faucetContract.depositWithPermit(amount, deadline, v, r, s);
			queryTokenBalanceUpdated(userBalance);
			setReviveAmt(0);
		} catch (err) {
			setErrorMessage(err.message);
		}
	}

	const checkAccountMaticBalance = async (account) => {
		if (account && provider) {
			const balance = await provider.getBalance(account);
			if (balance) setUserMaticBalance(ethers.utils.formatEther(balance));
		}
	}

	const checkNetwork =  async () => {
		const network = await provider.getNetwork();
		if (network.chainId !== 80001) throw new Error('Please Switch to Polygon Mumbai Network');
	}

	const requestFromFaucet = async () => {
		try {
			setRequestFaucetPrompt(false);
			await faucetContract.requestTokens();
			await queryTokenBalanceUpdated(userBalance);
		} catch (err) {
			const reason = err.reason
			switch (reason) {
				case 'execution reverted: RateLimitError: Your next request time is not reached yet':
					setErrorMessage('Your next request time is not reached yet')
					break
				case 'user rejected transaction':
					setErrorMessage('You need will need some testnet MATIC and approve the transaction. Please try again')
					break
				default:
					setErrorMessage('Unknown error, please try again')
					break
			}
		}
	}

	const chainChangedHandler = async () => {
		// reload the page to avoid any errors with chain change mid use of application
		try {
			await checkNetwork();
			setErrorMessage("");
		} catch (error) {
			resetState();
			setErrorMessage("Please switch to Polygon Mumbai Network");
		}
	}

	const connectButtonClickHandler = () => {
		setLoggedInClicked(true);
		connectWalletHandler();
	};

	const queryTokenBalanceUpdated = async (oldBalance) => {
		setIsLoading(true);
		var result = await new Promise((resolve, reject) => {
			const newBalance = setInterval(async () => {
				try {
					const balance = await ttkContract.balanceOf(account);
					const parsedBalance = ethers.utils.formatEther(balance)
					if (parsedBalance !== oldBalance) {
						clearInterval(newBalance)
						resolve(parsedBalance)
					}
				} catch (err) {
					setErrorMessage(err.message);
				}
			}, 1000)
		});
		if (result!=null) setUserBalance(result);
		setIsLoading(false);
		navigate("/")
		window.location.reload();
	}

	const navigate = useNavigate();

  const handleClick = () => {
    navigate("/prologue")
  }

  return (
		<ChakraProvider>
			<Box style={{
				backgroundColor: "rgba(255, 255, 255,0.6)",
				padding: "10px",
				borderRadius: "10px",
				display: "flex",
				flexDirection: "column",
				marginBlock:"40%",
			}}>
				{account==='' ? 
					<Button type="button" onClick={connectButtonClickHandler}>{connButtonText}</Button> 
				: 
					<>
						<Box className='accountDisplay'>
							<Text>Address: {account}</Text>
						</Box>
					</>
				}
				{
					account!=='' && userMaticBalance==0 ? 
					<Link href="https://mumbaifaucet.com/" textDecoration={"underline"} isExternal>Get Your Testnet MATIC Here<ExternalLinkIcon mx='2px' /></Link> 
				: 
					null
				}
				{
					account.length && userBalance && userBalance>0 && reviveAmt===0 ? 
					<Button style={{
						marginTop: '5px',
					}} onClick={handleClick}>Start Game</Button>
					: null  
				}
				{reviveAmt>0 ? 
					<Button style={{
						marginTop: '5px',
					}} onClick={() => {
						depositWithPermit(reviveAmt)
					}}>Spend Token to Revive</Button> 
				: 
					null
				}
				{account!=='' && (rewardAmt>0 || isLogin) ? 
					<Button style={{
						marginTop: '5px',
					}} onClick={requestFromFaucet}>Claim {isLogin? 'Daily': ''} Reward</Button> 
				: 
					null
				}
				{account!==''? 
					<Button style={{
						marginTop: '5px',
					}} onClick={resetState}>Logout</Button> 
				: 
					null
				}
			</Box>
		</ChakraProvider>
  );
}

export default LoginModalComponent;