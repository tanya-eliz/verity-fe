import React, {useState, useEffect} from 'react'
import {ethers} from 'ethers'
import {
  VerityTokenABI,
  FaucetABI,
  VerityTokenAddress,
  FaucetAddress,
} from "../constants";

const LoginModalComponent = () => {  
  const [errorMessage, setErrorMessage] = useState(null);
	const [account, setAccount] = useState("");
	const [userBalance, setUserBalance] = useState(null);
	const [connButtonText, setConnButtonText] = useState('Connect Wallet');
	const [provider, setProvider] = useState(null);
	const [signer, setSigner] = useState(null);
	const [ttkContract, setTtkContract] = useState(null);
	const [faucetContract, setFaucetContract] = useState(null);
	const [requestFaucetPrompt, setRequestFaucetPrompt] = useState(false);

	useEffect(() => {
		let providerInit = new ethers.providers.Web3Provider(window.ethereum)
		let signerInit = providerInit.getSigner();
		let ttkContractInit = new ethers.Contract(VerityTokenAddress, VerityTokenABI, signerInit);
		let faucetContractInit = new ethers.Contract(FaucetAddress, FaucetABI, signerInit);
		console.log(faucetContractInit);
		setProvider(providerInit);
		setSigner(signerInit);
		setTtkContract(ttkContractInit);
		setFaucetContract(faucetContractInit);
	}, []);

	useEffect(() => {
		checkContractForBalance(account);
		// updateTargetSmartContractAddressOfFaucet();
	}, [account])

	const connectWalletHandler = () => {
		if (window.ethereum && window.ethereum.isMetaMask) {
			window.ethereum.request({ method: 'eth_requestAccounts'})
			.then(result => {
				accountChangedHandler(result[0]);
				setConnButtonText('Wallet Connected');
			})
			.catch(error => {
				setErrorMessage(error.message);
			});

		} else {
			setErrorMessage('Please install MetaMask browser extension to interact');
		}
	}

	// update account, will cause component re-render
	const accountChangedHandler = (newAccount) => {
		setAccount(newAccount);
	}

	// set smart contract address to TTK address
	const updateTargetSmartContractAddressOfFaucet = async () => {
		try {
			await faucetContract.setTokenAddress(VerityTokenAddress);
		} catch (err) {
			console.log(err);
		}
	}

	// check contract for balance
	const checkContractForBalance = async (account) => {
		if (account) {
			console.log(`checking balance for ${account} from ${ttkContract?.address}`)
			try {
				const balance = await ttkContract.balanceOf(account);
				console.log(balance);
				setUserBalance(ethers.utils.formatEther(balance));
			} catch (err) {
				// alert("you dont have any token")
				setUserBalance(ethers.utils.formatEther(0));
				setRequestFaucetPrompt(true);
			}
		}
	}

	const requestFromFaucet = async () => {
		try {
			setRequestFaucetPrompt(false);
			await faucetContract.requestTokens();
		} catch (err) {
			console.log(err);
		}
	}

	const chainChangedHandler = () => {
		// reload the page to avoid any errors with chain change mid use of application
		window.location.reload();
	}

	// listen for account changes
	window.ethereum.on('accountsChanged', accountChangedHandler);
	window.ethereum.on('chainChanged', chainChangedHandler);

  return (
    <div>
      <h4> {"Connection to MetaMask using window.ethereum methods"} </h4>
			<button onClick={connectWalletHandler}>{connButtonText}</button>
			<div className='accountDisplay'>
				<h3>Address: {account}</h3>
			</div>
			<div className='balanceDisplay'>
				<h3>Balance: {userBalance}</h3>
			</div>
			{errorMessage}
			{requestFaucetPrompt ? <button onClick={requestFromFaucet}>Request from Faucet</button> : null}
    </div>
  );
}

export default LoginModalComponent;