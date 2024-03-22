import React, {useState, useEffect} from 'react';
import { ethers } from 'ethers';

import { useStateContext } from '../context';
import { checkIfImage } from '@/utils';

const index = () => {
  const {contract, address, connect, realEstate, createPropertyFunction, getAllProperties} = useStateContext();
  const[isLoading, setIsLoading] = useState(false)
  const[properties, setProperties] = useState([])
  const[form, setForm] = useState({
    owner: "",
    propTitle: "",
    propDesc: "",
    propAddr: "",
    price: "",
    category: "",
    images: ""
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({...form, [fieldName] : e.target.value})
  }

  const handleSubmit = async(e) => {
    alert("1. handleSubmit");
    e.prevendivefault();
    alert("2. handleSubmit");
    checkIfImage(form.images, async(exists) => {
        if(exists) {
          setIsLoading(true);
          await createPropertyFunction({
            ...form,
            price: ethers.utils.parseUnits(form.price, 18),
          });
          setIsLoading(false);
        } else {
          alert("Please enter image URL.");
          setForm(...form, images="");
        }
    }); 
  }

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
 
  return  <div> 
         <h1>{realEstate} </h1>       
         <p>{address}</p>
         <button onClick = {() => connect()}>Connect Wallet</button>

         <h1>Create Property</h1> 
         <form onSubmit = {(e) => handleSubmit(e)}>
         <div>
            <input type="text" placeholder='Owner Address' onChange= {(e) => handleFormFieldChange("owner", e)}/>
            </div>
            <div>
            <input type="text" placeholder='PropertyTitle' onChange= {(e) => handleFormFieldChange("propTitle", e)}/>
            </div>
            <div>
              <input type="text" placeholder='PropertyDescription' onChange= {(e) => handleFormFieldChange("propDesc", e)}/>
              </div>
            <div>
              <input type="text" placeholder='PropertyAddr' onChange= {(e) => handleFormFieldChange("propAddr", e)}/>
              </div>
            <div>
              <input type="text" placeholder='Price' onChange= {(e) => handleFormFieldChange("price", e)}/>
              </div>
            <div>
              <input type="text" placeholder='category' onChange= {(e) => handleFormFieldChange("category", e)}/>
            </div>
            <div>
              <input type="text" placeholder='image' onChange= {(e) => handleFormFieldChange("images", e)}/>
            </div>
              <button type="submit">Submit</button>
         </form>
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
    </div>;
};
export default index;