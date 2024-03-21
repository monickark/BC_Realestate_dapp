import React, { createContext, useContext } from 'react'
import { useAddress, useContract, useMetamask, useContractEvents, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
    const {contract} = useContract("0x1d1062f57b65Fc578879ba4d58A7d2fC66cF3B00");
    console.log(contract);
    const address = useAddress();
    const connect = useMetamask();
    const realEstate = "Real Estate Dapp";

  return (
    <StateContext.Provider value = {{contract, address, connect, realEstate}}>
       {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);