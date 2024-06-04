import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';

import { useStateContext } from "@/context";
import { checkIfImage } from "@/utils";
import { useRouter } from "next/router";


const SingleProperty = () => {  
  const {contract, address, getSingleProperty} = useStateContext();
  const[isLoading, setIsLoading] = useState(false)
  const[property, setProperty] = useState({});
  const router = useRouter();

    const fetchSingleProperty = async () => {
      console.log("Query Obj Id : ", router.query.id);
      setIsLoading(true);
      const data = await getSingleProperty(router.query.id);
      console.log("data in index page :", data);
      setProperty(data);
      setIsLoading(true);
    }
    useEffect(() => {
      if(contract)  fetchSingleProperty();
    }, [contract, address])



  const [form, setForm] = useState({
    owner: "",
    propTitle: "",
    propDesc: "",
    propAddr: "",
    price: "",
    category: "",
    images: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    alert("1. handleSubmit");
    e.preventDefault();
    alert("2. handleSubmit");
    checkIfImage(form.images, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createPropertyFunction({
          ...form,
          price: ethers.utils.parseUnits(form.price, 18),
        });
        setIsLoading(false);
        alert("data saved successfully...")
      } else {
        alert("Please enter image URL.");
        setForm(...form, (images = ""));
      }
    });
  };

  return (
    <>
    <div className="flex flex-col min-h-screen mx-auto max-w-2xl px-4 pt-4 pb-16">
     
      <div className="flex gap-3 h-[82%]">
        <div className="bg-white flex-1 p-3 flex justify-center items-center">
       
          <form onSubmit={(e) => handleSubmit(e)}>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 !leading-[1.4]">
          Update Property</h3>           
            <div>
              <input
                type="text" value={property.propTitle}
                placeholder="PropertyTitle"
                className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                onChange={(e) => handleFormFieldChange("propTitle", e)}
              />
            </div>
            <div>
              <input
                type="text" value={property.propAddr}
                placeholder="PropertyAddr"
                className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                onChange={(e) => handleFormFieldChange("propAddr", e)}
              />
            </div>
            <div>
              <input
                type="text" value={property.price} readOnly
                placeholder="Price"  className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
              />
            </div>
            <div>
              <input
                type="text" value={property.category}
                placeholder="category"  className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        
                onChange={(e) => handleFormFieldChange("category", e)}
              />
            </div>
            <div>
              <input
                type="text" value={property.images}
                placeholder="image"  className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        
                onChange={(e) => handleFormFieldChange("images", e)}
              />
            </div>
            <button  className="block mt-6 h-14 mx-auto w-full px-6 py-3 leading-none font-semibold rounded-lg text-white bg-gray-900 focus:outline-none"
            type="submit">Update</button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default SingleProperty;
