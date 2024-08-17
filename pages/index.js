import React,{useState,useEffect,useContext} from 'react';
import Image from 'next/image';
import {ERC20ICOContext} from '../context/SpToken';


const Home = () => 
{
  const {checkConnection, ERC20SpToken, transferToken, 
    tokenHolderData, account, accountBalance, NoOfToken, 
    TokenName, TokenStandard, TokenSymbol, TokenOwner, 
    TokenOwnerBal
  } = useContext(ERC20ICOContext);

  useEffect(()=>{
    checkConnection();
    tokenHolderData();
    ERC20SpToken();
  },[]);
  return <div>HOME</div>;
};

export default Home;