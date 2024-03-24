import React, {useState, useEffect}  from 'react'

import { useStateContext } from '@/context';

const PropertiesList = () => {

  const {contract, address, getAllProperties} = useStateContext();
  const[isLoading, setIsLoading] = useState(false)
  const[properties, setProperties] = useState([])

  const fetchProperty = async () => {
    setIsLoading(true);
    const data = await getAllProperties();
    console.log("data in index page :", data);
    setProperties(data);
    setIsLoading(true);
  }
  useEffect(() => {
    if(contract)  fetchProperty();
  }, [contract, address])

  return (
    <>
     <h1>Properties List</h1>
         { properties ? properties.map((data, i) => (
            <>
             <div> PropId:  {data.propId} </div>
             <div> Owner:  {data.owner} </div>
              <div> price:  {data.price} </div>
              <div> propTitle:  {data.propTitle} </div>
              <div> category:  {data.category} </div>
              <div> images:  {data.images} </div>
              <div> propAddr:  {data.propAddr} </div>
              <hr/>
            </>              
        )): null}
    </>
  )
}

export default PropertiesList