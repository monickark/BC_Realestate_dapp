import React, { createContext, useContext } from 'react'
import { useAddress, useContract, useMetamask, useContractEvents, useContractRead, useContractWrite } from '@thirdweb-dev/react'
import { BigNumber, ethers } from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({children}) => {
  
    const {contract} = useContract("0x1d1062f57b65Fc578879ba4d58A7d2fC66cF3B00");
    console.log(contract);
    const address = useAddress();
    const connect = useMetamask();
    const realEstate = "Real Estate Dapp";

    // FUNCTIONS
    //1.List Property
    const { mutateAsync: listProperty, isLoading } = useContractWrite(contract, "listProperty")
    const createPropertyFunction = async (form) => {
      const { owner, propTitle,  propDesc, propAddr, price, category, images} = form;
      console.log(form);
      console.log("owner", owner);
      console.log("propTitle", propTitle);
      console.log("propDesc", propDesc);
      try {
        const data = await listProperty({ args: [owner, price, propTitle, category, images, propAddr]});
        console.info("contract call successs", data);
      } catch (err) {
        console.error("contract call failure", err);
      }
    }

    //2.Retrieve Property    
    const getAllProperties = async () => {
      try{
      const data = await contract.call("getAllProperties");
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
              
  return (
    <StateContext.Provider value = {{contract, address, connect, realEstate, 
            createPropertyFunction, getAllProperties}}>
       {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);