
import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { checkIfImage } from '@/utils';
import ListProperty from '@/pages/Property/CreateProperty';
import ResponsiveAppBar from '@/pages/AppBar/ResponsiveAppBar';
import CreateProperty from '@/pages/Property/CreateProperty';
import PropertiesList from '@/pages/PropertiesList/PropertiesList';

const index = () => {
  return  <div>       
          <ResponsiveAppBar></ResponsiveAppBar>
          <CreateProperty></CreateProperty>
          <PropertiesList></PropertiesList>        
    </div>;
};
export default index;