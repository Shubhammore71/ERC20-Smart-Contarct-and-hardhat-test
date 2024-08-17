import React, { useState, createContext } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { spTokenAddress, spTokenABI } from './constants';

const fetchContractERC20 = (signerOrProvider) =>
  new ethers.Contract(spTokenAddress, spTokenABI, signerOrProvider);

export const ERC20ICOContext = createContext();

export const ERC20Provider = ({ children }) => {

  const [holderArray, setHolderArray] = useState([]);
  const [account, setAccount] = useState('');
  const [accountBalance, setAccountBalance] = useState('');
  const [userId, setUserId] = useState('');
  const [NoOfToken, setNoOfToken] = useState('');
  const [TokenName, setTokenName] = useState('');
  const [TokenStandard, setTokenStandard] = useState('');
  const [TokenSymbol, setTokenSymbol] = useState('');
  const [TokenOwner, setTokenOwner] = useState('');
  const [TokenOwnerBal, setTokenOwnerBal] = useState('');

  const checkConnection = async () => {
    try {
      if (!window.ethereum) {
        console.log("Install Metamask");
        return;
      }

      const accounts = await window.ethereum.request({ method: "eth_accounts" });
      if (accounts.length === 0) {
        console.log("No account found");
        return;
      }
      setAccount(accounts[0]);

      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      const balance = await contract.balanceOf(accounts[0]);
      const formattedBalance = ethers.utils.formatUnits(balance, 18); // Assuming 18 decimals
      setAccountBalance(formattedBalance);

      const totalHolder = await contract._userId();
      setUserId(totalHolder.toNumber());
    } catch (error) {
      console.log("App is not connected", error);
    }
  };

  const ERC20SpToken = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      const supply = await contract.totalSupply();
      const totalSupply = ethers.utils.formatUnits(supply, 18); // Assuming 18 decimals
      setNoOfToken(totalSupply);

      const name = await contract.name();
      setTokenName(name);

      const symbol = await contract.symbol();
      setTokenSymbol(symbol);

      const standard = await contract.standard(); // Ensure the contract has this method
      setTokenStandard(standard);

      const ownerOfContract = await contract.ownerOfContract(); // Ensure the contract has this method
      setTokenOwner(ownerOfContract);

      const balanceToken = await contract.balanceOf("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266");
      const formattedOwnerBalance = ethers.utils.formatUnits(balanceToken, 18); // Assuming 18 decimals
      setTokenOwnerBal(formattedOwnerBalance);
    } catch (error) {
      console.log("Error in ERC20 Token", error);
    }
  };

  const transferToken = async (address, value) => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      const transfer = await contract.transfer(address, BigInt(value));
      await transfer.wait();

      window.location.reload(); // Reload to reflect changes
    } catch (error) {
      console.log("Something went wrong during the token transfer", error);
    }
  };

  const tokenHolderData = async () => {
    try {
      const web3modal = new Web3Modal();
      const connection = await web3modal.connect();
      const provider = new ethers.providers.Web3Provider(connection);
      const signer = provider.getSigner();
      const contract = fetchContractERC20(signer);

      const allTokenHolder = await contract.getTokenHolder();

      const holderDataPromises = allTokenHolder.map(async (el) => {
        const singleHolderData = await contract.getTokenHolderData(el);
        return singleHolderData;
      });

      const resolvedHolderArray = await Promise.all(holderDataPromises);
      setHolderArray(resolvedHolderArray);
      console.log(resolvedHolderArray);

    } catch (error) {
      console.log("Something went wrong while fetching token holder data", error);
    }
  };

  return (
    <ERC20ICOContext.Provider value={{checkConnection, ERC20SpToken, transferToken, tokenHolderData, account, accountBalance, NoOfToken, TokenName, TokenStandard, TokenSymbol, TokenOwner, TokenOwnerBal }}>
      {children}
    </ERC20ICOContext.Provider>
  );
};
