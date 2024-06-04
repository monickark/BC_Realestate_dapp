
import React from 'react';

import CreateProperty from '@/pages/Property/CreateProperty';
import PropertiesList from '@/pages/Property/PropertiesList';

const index = () => {
  return  <div>
          <CreateProperty></CreateProperty>
          <PropertiesList></PropertiesList>        
    </div>;
};
export default index;