import { ethers } from 'hardhat';
import { NativeOwnerApproval__factory, NativeOwnerApproval } from '../typechain-types';

const abicoder = ethers.utils.defaultAbiCoder;
// const ownerPK = 'd8a8ce8051cb5a44102f8634524f75889b7b49fe6eeee4b358cc924598d3d196'; // accounts[0] PK
const ownerPK = process.env.ownerPK; // accounts[0] PK
const provider = ethers.getDefaultProvider();
const signer = new ethers.Wallet(ownerPK as string, provider);
let NativeOwnerApprovalFactory: NativeOwnerApproval__factory;
let NativeOwnerApprovalContract: NativeOwnerApproval;

const types = {
  OwnerApproval: [
    {
      name: 'nonce',
      type: 'uint256',
    },
    {
      name: 'from',
      type: 'address',
    },
    {
      name: 'userData',
      type: 'bytes',
    },
  ],
};

const getDomainDataAndNonce = async (contract_name: string, account_addr: string, contract_addr: string) => {
  NativeOwnerApprovalFactory = await ethers.getContractFactory('NativeOwnerApproval');
  NativeOwnerApprovalContract = NativeOwnerApprovalFactory.attach(contract_addr);
  let name = contract_name;
  let nonce = (await NativeOwnerApprovalContract.getNonce(account_addr)).toString();
  let version = '1';
  let chainId = (await NativeOwnerApprovalContract.getChainId()).toString();
  let domainData = {
    name: name,
    version: version,
    verifyingContract: contract_addr,
    salt: '0x' + parseInt(chainId).toString(16).padStart(64, '0'),
  };

  return { domainData, nonce };
};

const getTransactionData = async (contract_name: string, params: any, user_address: string, contract_addr: string) => {
  const { domainData, nonce } = await getDomainDataAndNonce(contract_name, user_address, contract_addr);
  const _userData = abicoder.encode(params.paramsTypes, params.paramsData);
  const signingData = {
    nonce: parseInt(nonce),
    from: params.paramsData[0],
    userData: _userData,
  };

  const signature = await signer._signTypedData(domainData, types, signingData);
  const expectedSignerAddress = signer.address;
  // console.log(expectedSignerAddress);
  const recoveredAddress = ethers.utils.verifyTypedData(domainData, types, signingData, signature);
  // console.log(recoveredAddress === expectedSignerAddress);
  let r = signature.slice(0, 66);
  let s = '0x'.concat(signature.slice(66, 130));
  let V = '0x'.concat(signature.slice(130, 132));
  let v = parseInt(V);

  if (![27, 28].includes(v)) {
    v += 27;
  }
  return { r, s, v };
};

const call = async () => {
  const accounts1_addr = process.env.addr;
  // const accounts1_addr = "0x21bebddFc50E09F69B46c1AebeeBbEFa7E6ebDA3";

  const proxy_address_purchase_bnz = process.env.proxyContractAddr;
  // const proxy_address_purchase_bnz = "0x391F33f456AbeFcbf51d99987Dd24AF3A37F37d1";
  const currentTimeStamp = (await ethers.provider.getBlock('latest')).timestamp;
  const deadline = Math.floor(Date.now() / 1000) + 300;
  const PurchaseBNZFactory = await ethers.getContractFactory('PurchaseBNZ');
  const PurchaseBNZContract = PurchaseBNZFactory.attach(proxy_address_purchase_bnz);
  const TokenPriceInWei = ethers.utils.formatEther(await PurchaseBNZContract.Token_Price_In_Wei());

  const amount_of_bnz_to_buy = process.env.amount_of_bnz_to_buy;
  // const amount_of_bnz_to_buy = 1;

  const msg_value = ethers.utils.parseEther((amount_of_bnz_to_buy * parseFloat(TokenPriceInWei)).toString());
  const paramsData = [accounts1_addr, msg_value.toString(), deadline];
  const paramsTypes = ['address', 'uint256', 'uint256'];
  let { r, s, v } = await getTransactionData(
    'PurchaseBNZ',
    { paramsTypes, paramsData },
    accounts1_addr,
    proxy_address_purchase_bnz
  );
  // console.log({ r, s, v });
  let demo = {
		deadline: deadline,
		msg_value: msg_value.toString(),
		r: r,
		s: s,
		v: v,
	};
	
	console.log(JSON.stringify(demo));
};

call();
