import React, {useState, useEffect} from 'react'
import {ethers, BigNumber} from 'ethers'
import {
  VerityTokenABI,
  FaucetABI,
  VerityTokenAddress,
  FaucetAddress,
} from "../constants";
import {
	ChakraProvider,
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
	Spinner,
	Badge
} from "@chakra-ui/react";
import {	ExternalLinkIcon } from "@chakra-ui/icons";

const LoginModalComponent = () => {  
  const [errorMessage, setErrorMessage] = useState(null);
	const [loggedInClicked,setLoggedInClicked] = useState(false);
	const [account, setAccount] = useState("");
	const [userBalance, setUserBalance] = useState(null);
	const [userMaticBalance, setUserMaticBalance] = useState(0);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [ttkContract, setTtkContract] = useState(null);
	const [faucetContract, setFaucetContract] = useState(null);
	const [requestFaucetPrompt, setRequestFaucetPrompt] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isMetaMask, setIsMetaMask] = useState(false);

	useEffect(() => {
		if (isMetaMask) {
			let providerInit = new ethers.providers.Web3Provider(window.ethereum)
			let signerInit = providerInit.getSigner();
			let ttkContractInit = new ethers.Contract(VerityTokenAddress, VerityTokenABI, signerInit);
			let faucetContractInit = new ethers.Contract(FaucetAddress, FaucetABI, signerInit);
			setProvider(providerInit);
			setSigner(signerInit);
			setTtkContract(ttkContractInit);
			setFaucetContract(faucetContractInit);
		}
	}, [isMetaMask]);

	useEffect(() => {
		setIsLoading(true);
		Promise.all([
		checkContractForBalance(account),
		checkAccountMaticBalance(account)
		]).then(() =>
		setIsLoading(false)
		);
	}, [account]);

	useEffect(() => {
		setTimeout(() => {
			setErrorMessage(null);
		}, 5000);
	}, [errorMessage]);

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
		} catch (err) {
			setErrorMessage(err.message);
		}
	}

	const checkAccountMaticBalance = async (account) => {
		if (account) {
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


	// listen for account changes
	if (isMetaMask) {
		window.ethereum.on('accountsChanged', accountChangedHandler);
		window.ethereum.on('chainChanged', chainChangedHandler);
	}

  return (
		<ChakraProvider>
    <div>
			{account==='' ? 
				<Button type="button" onClick={connectButtonClickHandler}>{connButtonText}</Button> 
			: isLoading ?
				<Spinner size="xl" />
			:
				<>
					<div className='accountDisplay'>
						<h3>Address: {account}</h3>
					</div>
					<div className='balanceDisplay'>
						<h3>Balance: {userBalance}</h3>
					</div>
				</>
			}
			{account!=='' && userMaticBalance==0 ? 
				<Link href="https://mumbaifaucet.com/" textDecoration={"underline"} isExternal>Get Your Testnet MATIC Here<ExternalLinkIcon mx='2px' /></Link> 
			: 
				null
			}
			{userBalance>0 ? 
				<Button onClick={() => depositWithPermit(1)}>Deposit</Button> 
			: 
				null
			}
			{userMaticBalance>0 ? 
				<Button onClick={requestFromFaucet}>Get More Verity Token</Button> 
			: 
				null
			}
			{account!==''? 
				<Button onClick={resetState}>Logout</Button> 
			: 
				null
			}
			{errorMessage ? 
				<Badge colorScheme='red'>{errorMessage}</Badge> 
			: 
				null
			}
    </div>
		</ChakraProvider>
  );
}

export default LoginModalComponent;