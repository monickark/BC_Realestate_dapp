import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';

import { useStateContext } from '../context';

const index = () => {
  const {contract, address, connect, realEstate} = useStateContext();
  return  <div> 
         <h1>{realEstate} </h1>
       
         <p>{address}</p>
         <button onClick = {() => connect()}>Connect Wallet</button>
    </div>;
};
export default index;