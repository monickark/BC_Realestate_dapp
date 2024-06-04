import React, { createContext, useContext } from 'react'
import { BigNumber, ethers } from 'ethers';
import { createThirdwebClient, getContract, readContract, resolveMethod, prepareContractCall, sendTransaction } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { useAddress, useContractWrite, useMetamask } from '@thirdweb-dev/react';
import { useSendTransaction } from "thirdweb/react";
const StateContext = createContext();

export const client = createThirdwebClient({ 
  clientId: "1807681d1aa0a1f2c8656e3ebc0256d1" 
});

export const contract = getContract({ 
  client, 
  chain: defineChain(80002), 
  address: "0xdea1bd192fdf677d7545bf72B2Ad9096284E214b"
});

export const StateContextProvider = ({children}) => {
    console.log(contract);
    const address = useAddress();
    const connect = useMetamask();
    const realEstate = "Real Estate Dapp";

    // FUNCTIONS
    //1.List Property    
  
    const createPropertyFunction = async (form) => {
      const { owner, propTitle,  propDesc, propAddr, price, category, images} = form;
      console.log(form);
      console.log("owner", owner);
      console.log("propTitle", propTitle);
      console.log("propDesc", propDesc);
      try {
        const transaction = await prepareContractCall({ 
          contract, 
          method: resolveMethod("listProperty"), 
          params: [owner, price, propTitle, category, images, propAddr] 
        });
        const { transactionHash } = await sendTransaction({transaction, account});
        console.info("contract call successs", transactionHash);
      } catch (err) {
        console.error("contract call failure", err);
      }
    }

    //2.Retrieve Property    
    const getAllProperties = async () => {
      try{
      const data = await readContract({ 
        contract, 
        method: resolveMethod("getAllProperties"), 
        params: [] 
      })
      console.log("data: ", data)
      const parsedProperties = data.map((property,i) => ({
        propId : ethers.utils.formatUnits(property.propId, 0),
        owner : property.owner,
        price : ethers.utils.formatEther(property.price),
        propTitle : property.propTitle,
        category : property.category,
        images : property.images,
        propAddr : property.propAddr
      }))
      console.log("parsedProperties :", parsedProperties);
      return parsedProperties;
    } catch(err) {
      console.error(err)
    }
    }

    //3.Retrieve Single Property    
     const getSingleProperty = async (propId) => {
      try{
        console.log("rop id b4 contract call: ", propId)
        const { data } = useReadContract({ 
          contract, 
          method: resolveMethod("getProperty"), 
          params: [propId] 
        });
      console.log("data: ", data)
      const parsedProperty = data  => ({
        propId : ethers.utils.formatUnits(data.propId, 0),
        owner : data.owner,
        price : data.utils.formatEther(property.price),
        propTitle : data.propTitle,
        category : data.category,
        images : data.images,
        propAddr : data.propAddr
      })
      console.log("parsedProperties :", parsedProperty);
      return parsedProperty;
    } catch(err) {
      console.error(err)
    }
    }
              
  return (
    <StateContext.Provider value = {{contract, address, connect, realEstate, 
            createPropertyFunction, getAllProperties, getSingleProperty}}>
       {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);