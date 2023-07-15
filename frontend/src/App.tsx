import { useEffect, useState } from "react";
import { Web3Auth } from "@web3auth/modal";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CHAIN_NAMESPACES, SafeEventEmitterProvider } from "@web3auth/base";
import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import "./App.css";
import RPC from "./web3RPC"; // for using web3.js
//import RPC from "./ethersRPC"; // for using ethers.js

// Plugins
import { TorusWalletConnectorPlugin } from "@web3auth/torus-wallet-connector-plugin";

// Adapters
import {
	WalletConnectV2Adapter,
	getWalletConnectV2Settings,
} from "@web3auth/wallet-connect-v2-adapter";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";
import { TorusWalletAdapter } from "@web3auth/torus-evm-adapter";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import axios from "axios";
import LoginPage from "./login";
import UserPage from "./UserPage";
import Mint from "./Mint";
import Last from "./Last";

const clientId =
	"BEglQSgt4cUWcj6SKRdu5QkOXTsePmMcusG5EAoyjyOYKlVRjIF1iCNnMOTfpzCiunHRrMui8TIwQPXdkQ8Yxuk"; // get from https://dashboard.web3auth.io

function App() {
	const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
	const [torusPlugin, setTorusPlugin] = useState<TorusWalletConnectorPlugin | null>(null);
	const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [userInfo, setUserInfo] = useState(null);
	const [balance, setBalance] = useState(null);
	const [publicAddress, setPublicAddress] = useState(null);
	const [fetchData, setFetchData] = useState(null);

	// const [getUser, setUser] = useState("");
	let Setuser: any;
	useEffect(() => {
		const init = async () => {
			try {
				const web3auth = new Web3Auth({
					clientId,
					chainConfig: {
						chainNamespace: CHAIN_NAMESPACES.EIP155,
						chainId: "0x33",
						rpcTarget: "https://erpc.apothem.network", // This is the public RPC we have added, please pass on your own endpoint while creating an app
					},
					uiConfig: {
						appName: "W3A",
						appLogo: "https://web3auth.io/images/w3a-L-Favicon-1.svg", // Your App Logo Here
						theme: "light",
						loginMethodsOrder: ["apple", "google", "twitter"],
						defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
						loginGridCol: 3,
						primaryButton: "externalLogin", // "externalLogin" | "socialLogin" | "emailLogin"
					},
					web3AuthNetwork: "cyan",
				});

				const openloginAdapter = new OpenloginAdapter({
					loginSettings: {
						mfaLevel: "optional",
					},
					adapterSettings: {
						whiteLabel: {
							name: "Your app Name",
							logoLight: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
							logoDark: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
							defaultLanguage: "en", // en, de, ja, ko, zh, es, fr, pt, nl
							dark: false, // whether to enable dark mode. defaultValue: false
						},
						mfaSettings: {
							deviceShareFactor: {
								enable: true,
								priority: 1,
								mandatory: true,
							},
							backUpShareFactor: {
								enable: true,
								priority: 2,
								mandatory: false,
							},
							socialBackupFactor: {
								enable: true,
								priority: 3,
								mandatory: false,
							},
							passwordFactor: {
								enable: true,
								priority: 4,
								mandatory: false,
							},
						},
					},
				});
				web3auth.configureAdapter(openloginAdapter);

				// plugins and adapters are optional and can be added as per your requirement
				// read more about plugins here: https://web3auth.io/docs/sdk/web/plugins/

				// adding torus wallet connector plugin

				const torusPlugin = new TorusWalletConnectorPlugin({
					torusWalletOpts: {},
					walletInitOptions: {
						whiteLabel: {
							theme: { isDark: true, colors: { primary: "#00a8ff" } },
							logoDark: "https://web3auth.io/images/w3a-L-Favicon-1.svg",
							logoLight: "https://web3auth.io/images/w3a-D-Favicon-1.svg",
						},
						useWalletConnect: true,
						enableLogging: true,
					},
				});
				setTorusPlugin(torusPlugin);
				await web3auth.addPlugin(torusPlugin);

				// read more about adapters here: https://web3auth.io/docs/sdk/web/adapters/

				// adding wallet connect v1 adapter
				// const walletConnectV1Adapter = new WalletConnectV1Adapter({
				//   adapterSettings: {
				//     bridge: "https://bridge.walletconnect.org",
				//   },
				//   clientId,
				// });

				// web3auth.configureAdapter(walletConnectV1Adapter);

				// adding wallet connect v2 adapter
				const defaultWcSettings = await getWalletConnectV2Settings(
					"eip155",
					[1, 137, 5],
					"04309ed1007e77d1f119b85205bb779d"
				);
				const walletConnectV2Adapter = new WalletConnectV2Adapter({
					adapterSettings: { ...defaultWcSettings.adapterSettings },
					loginSettings: { ...defaultWcSettings.loginSettings },
				});

				web3auth.configureAdapter(walletConnectV2Adapter);

				// adding metamask adapter
				const metamaskAdapter = new MetamaskAdapter({
					clientId,
					sessionTime: 3600, // 1 hour in seconds
					web3AuthNetwork: "cyan",
					chainConfig: {
						chainNamespace: CHAIN_NAMESPACES.EIP155,
						chainId: "0x33",
						rpcTarget: "https://erpc.apothem.network", // This is the public RPC we have added, please pass on your own endpoint while creating an app
					},
				});
				// we can change the above settings using this function
				metamaskAdapter.setAdapterSettings({
					sessionTime: 86400, // 1 day in seconds
					chainConfig: {
						chainNamespace: CHAIN_NAMESPACES.EIP155,
						chainId: "0x33",
						rpcTarget: "https://erpc.apothem.network", // This is the public RPC we have added, please pass on your own endpoint while creating an app
					},
					web3AuthNetwork: "cyan",
				});

				// it will add/update  the metamask adapter in to web3auth class
				web3auth.configureAdapter(metamaskAdapter);

				const torusWalletAdapter = new TorusWalletAdapter({
					clientId,
				});

				// it will add/update  the torus-evm adapter in to web3auth class
				web3auth.configureAdapter(torusWalletAdapter);

				setWeb3auth(web3auth);

				await web3auth.initModal();

				// await web3auth.initModal({
				//   modalConfig: {
				//     [WALLET_ADAPTERS.OPENLOGIN]: {
				//       label: "openlogin",
				//       loginMethods: {
				//         // Disable facebook and reddit
				//         facebook: {
				//           name: "facebook",
				//           showOnModal: false
				//         },
				//         reddit: {
				//           name: "reddit",
				//           showOnModal: false
				//         },
				//         // Disable email_passwordless and sms_passwordless
				//         email_passwordless: {
				//           name: "email_passwordless",
				//           showOnModal: false
				//         },
				//         sms_passwordless: {
				//           name: "sms_passwordless",
				//           showOnModal: false
				//         }
				//       }
				//     }
				//   }
				// });
				setProvider(web3auth.provider);

				if (web3auth.connected) {
					setLoggedIn(true);
				}
			} catch (error) {
				console.error(error);
			}
		};

		init();
	}, []);

	// useEffect(() => {
	// 	(async () => {
	// 		if (fetchData != null) {
	// 			// const response = await fetchDataFun({ name: "xdc" });
	// 			setFetchData({ name: "xdc" });
	// 		}
	// 	})();
	// }, [fetchData]);

	const login = async () => {
		if (!web3auth) {
			uiConsole("web3auth not initialized yet");
			return;
		}
		const web3authProvider = await web3auth.connect();
		console.log("web3authProvider");
		getUserInfo();
		getBalance();
		getAccounts();
        fetchDataFun({
            "name": "xdc"
            })
		setLoggedIn(true);
	};

	const authenticateUser = async () => {
		if (!web3auth) {
			uiConsole("web3auth not initialized yet");
			return;
		}
		const idToken = await web3auth.authenticateUser();
		uiConsole(idToken);
	};

	const getUserInfo = async () => {
		if (!web3auth) {
			uiConsole("web3auth not initialized yet");
			return;
		}
		const user = await web3auth.getUserInfo();
		// setUser(user);
		Setuser = user;
		console.log(user);
		setUserInfo(user);
		uiConsole(user);
	};

	const logout = async () => {
		if (!web3auth) {
			uiConsole("web3auth not initialized yet");
			return;
		}
		await web3auth.logout();
		setProvider(null);
		setLoggedIn(false);
	};

	const showWCM = async () => {
		if (!torusPlugin) {
			uiConsole("torus plugin not initialized yet");
			return;
		}
		torusPlugin.showWalletConnectScanner();
		uiConsole();
	};

	const initiateTopUp = async () => {
		if (!torusPlugin) {
			uiConsole("torus plugin not initialized yet");
			return;
		}
		torusPlugin.initiateTopup("moonpay", {
			selectedAddress: "0x8cFa648eBfD5736127BbaBd1d3cAe221B45AB9AF",
			selectedCurrency: "USD",
			fiatValue: 100,
			selectedCryptoCurrency: "ETH",
			chainNetwork: "mainnet",
		});
	};

	const getChainId = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		const rpc = new RPC(provider);
		const chainId = await rpc.getChainId();
		uiConsole(chainId);
	};

	const addChain = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		const newChain = {
			chainId: "0x5",
			displayName: "Goerli",
			chainNamespace: CHAIN_NAMESPACES.EIP155,
			tickerName: "Goerli",
			ticker: "ETH",
			decimals: 18,
			rpcTarget: "https://rpc.ankr.com/eth_goerli",
			blockExplorer: "https://goerli.etherscan.io",
		};
		await web3auth?.addChain(newChain);
		uiConsole("New Chain Added");
	};

	const switchChain = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		await web3auth?.switchChain({ chainId: "0x5" });
		uiConsole("Chain Switched");
	};

	const getAccounts = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		const rpc = new RPC(provider);
		const address = await rpc.getAccounts();
		setPublicAddress(address);
		uiConsole(address);
	};

	const getBalance = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		const rpc = new RPC(provider);
		const balance = await rpc.getBalance();
		setBalance(balance);
		uiConsole(balance);
	};

	const sendTransaction = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		const rpc = new RPC(provider);
		const receipt = await rpc.sendTransaction();
		uiConsole(receipt);
	};

	const setValuex = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		const rpc = new RPC(provider);
		const receipt = await rpc.setValuex();
		uiConsole(receipt);
	};

	const getValuex = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		const rpc = new RPC(provider);
		const receipt = await rpc.getValuex();
		uiConsole(receipt);
	};

	const signMessage = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		const rpc = new RPC(provider);
		const signedMessage = await rpc.signMessage();
		uiConsole(signedMessage);
	};

	const getPrivateKey = async () => {
		if (!provider) {
			uiConsole("provider not initialized yet");
			return;
		}
		const rpc = new RPC(provider);
		const privateKey = await rpc.getPrivateKey();
		uiConsole(privateKey);
	};

	// const changeNetwork = async () => {
	//   if (!provider) {
	//     uiConsole("provider not initialized yet");
	//     return;
	//   }
	//   const rpc = new RPC(provider);
	//   const privateKey = await rpc.getPrivateKey();
	//   uiConsole(privateKey);
	// };

	function uiConsole(...args: any[]): void {
		const el = document.querySelector("#console>p");
		if (el) {
			el.innerHTML = JSON.stringify(args || {}, null, 2);
		}
	}

	const loggedInView = (
		<div>
			<div className="flex-container">
				<div>
					<button style={{ height: 50 }} onClick={getUserInfo} className="card">
						Get User Info
					</button>
				</div>
				{/* <div>
					<button onClick={authenticateUser} className="card">
						Get ID Token
					</button>
				</div> */}
				{/* <div>
					<button onClick={showWCM} className="card">
						Show Wallet Connect Modal
					</button>
				</div> */}
				{/* <div>
					<button onClick={initiateTopUp} className="card">
						initiateTopUp
					</button>
				</div> */}
				{/* <div>
					<button onClick={getChainId} className="card">
						Get Chain ID
					</button>
				</div> */}
				{/* <div>
					<button onClick={addChain} className="card">
						Add Chain
					</button>
				</div> */}
				{/* <div>
					<button onClick={switchChain} className="card">
						Switch Chain
					</button>
				</div> */}
				<div>
					<button style={{ height: 50 }} onClick={getAccounts} className="card">
						Get Accounts
					</button>
				</div>
				<div>
					<button style={{ height: 50 }} onClick={getBalance} className="card">
						Get Balance
					</button>
				</div>
				<div>
					<button onClick={setValuex} className="card">
						setValuex
					</button>
				</div>
				<div>
					<button onClick={getValuex} className="card">
						getValuex
					</button>
				</div>
				{/* <div>
					<button onClick={signMessage} className="card">
						Sign Message
					</button>
				</div>
				<div>
					<button onClick={sendTransaction} className="card">
						Send Transaction
					</button>
				</div>
				 */}

				{/*  */}
				<div>
					<button onClick={getPrivateKey} className="card">
						Get Private Key
					</button>
				</div>
				<div>
					<button style={{ height: 50 }} onClick={logout} className="card">
						Log Out
					</button>
				</div>
			</div>
			<div id="console" style={{ whiteSpace: "pre-line" }}>
				<p style={{ whiteSpace: "pre-line" }}></p>
			</div>
		</div>
	);

	const unloggedInView = (
		<button style={{ height: 50 }} onClick={login} className="card">
			Login
		</button>
	);

	const projectAddDeploy = (e: any) => {
		// getUserInfo();
		e.preventDefault();
		console.log(e.target.name.value);
		console.log(Setuser.email);
		const data = {
			name: e.target.name.value,
			title: e.target.title.value,
			description: e.target.description.value,
			numOfTokens: e.target.numOfTokens.value,
			price: e.target.price.value,
			email: Setuser.email,
		};
		console.log(data);
		axios
			.post("http://localhost:5002/projects/addNdDeployProject", data)
			.then((response) => {
				console.log("Response:", response.data);
				alert(JSON.stringify(response.data));
				// Handle successful response
			})
			.catch((error) => {
				console.error("Error:", error);
				// Handle error
			});
	};

	const listTheProject = (e: any) => {
		e.preventDefault();
		const data = {
			numOfTokens: e.target.numOfTokens.value,
			projectId: e.target.projectId.value,
			email: Setuser.email,
		};
		console.log(data);
		axios
			.post("http://localhost:5002/projects/listProject", data)
			.then((response) => {
				console.log("Response:", response.data);
				// Handle successful response
			})
			.catch((error) => {
				console.error("Error:", error);
				// Handle error
			});
	};

	const buyTheTokens = async (e: any) => {
		try {
			e.preventDefault();
			const data = {
				projectId: e.target.projectId.value,
			};
			console.log(data);
			let numOfTokens = e.target.numOfTokens.value;
			let smartContractAddress: any;
			const response = await axios.post(
				"http://localhost:5002/projects/fetchSmartContractAddress",
				data
			);

			console.log("Response:", response.data);
			smartContractAddress = response.data;

			// Handle successful response

			if (!provider) {
				uiConsole("provider not initialized yet");
				return;
			}
			const rpc = new RPC(provider);
			const receipt = await rpc.purchaseToken(numOfTokens, smartContractAddress);
			alert(JSON.stringify(receipt));
		} catch (error) {
			console.log(error);
		}
	};

	const putData = async (data) => {
		console.log(data);
		const apiData = {
			// name: data.name,
			// title: data.title,
			// description: data.description,
			// createData: data.createData,
			// numOfTokens: data.numbOfTokens,
			name: "xdc carbon",
			title: "xdc carbon",
			description: "Carbon Description",
			createData: "created",
			numOfTokens: 100,
		};
		const respones = await axios.post("http://localhost:5002/XDCRoute/mintToken", apiData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(respones.data);
	};

	const fetchDataFun = async (data) => {
		console.log(data);
		const apiData = {
			name: "xdc carbon",
		};
		const respones = await axios.post("http://localhost:5002/XDCRoute/fetchProjects", apiData, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		console.log(respones.data);
		// return respones.data;
	};

    const deployContract = async () => {

        const data = {
            "NFT_NAME": "XDC Carbon",
            "NFT_SYMBOL": "XDC Carbon",
            "PRICEOFNFT": "1000000000000",
            "network": "xdc_testnet"
            };
        const response = await axios.post("http://localhost:5002/deployMintNFTERC721", data, {
            headers: {
				"Content-Type": "application/json",
			},
        })
        console.log(response);
    }

	return (
		<>
			{/* <BrowserRouter> */}
			{/* </BrowserRouter> */}
			{/* <div className="container">
				<div className="grid">{loggedIn ? loggedInView : unloggedInView}</div>
			</div>  */}
            
			<br />

			<ChakraProvider>
				{/* <Router> */}
				<div className="App">
					<Routes>
						<Route path="/" element={<LoginPage login={login} />} />
						<Route
							path="/mint"
							element={
								<Mint
									userInfo={userInfo}
									publicAddress={publicAddress}
									balance={balance}
									putData={putData}
                                    fetchData={fetchData}
                                    deployContract={deployContract}
									logout={logout}
								/>
							}
						/>
						<Route
							path="/userpage"
							element={
								<UserPage
									userInfo={userInfo}
									publicAddress={publicAddress}
									balance={balance}
                                    fetchData={fetchData}
									logout={logout}
								/>
							}
						/>
						<Route path="/last" element={<Last />} logout={logout} />
					</Routes>
				</div>
				{/* </Router> */}
			</ChakraProvider>
		</>
	);
}

export default App;