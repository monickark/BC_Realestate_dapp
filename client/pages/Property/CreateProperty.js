import React, { useState, useEffect } from "react";
import { ethers } from 'ethers';

import { useStateContext } from "@/context";
import { checkIfImage } from "@/utils";


const CreateProperty = () => {
  const { createPropertyFunction } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
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
        alert("image exists");
        setIsLoading(true);
        alert("b4 func");
        await createPropertyFunction({
          ...form,
          price: ethers.utils.parseUnits(form.price, 18),
        });
        alert("after func");
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
          Create Property</h3>
            <div>
              <input
                type="text"
                placeholder="Owner Address" 
                className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                onChange={(e) => handleFormFieldChange("owner", e)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="PropertyTitle"
                className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                onChange={(e) => handleFormFieldChange("propTitle", e)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="PropertyDescription"  className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                onChange={(e) => handleFormFieldChange("propDesc", e)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="PropertyAddr"
                className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
                onChange={(e) => handleFormFieldChange("propAddr", e)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Price"  className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        
                onChange={(e) => handleFormFieldChange("price", e)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="category"  className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        
                onChange={(e) => handleFormFieldChange("category", e)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="image"  className="block h-14 mt-5 mx-auto w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-gray-500"
        
                onChange={(e) => handleFormFieldChange("images", e)}
              />
            </div>
            <button  className="block mt-6 h-14 mx-auto w-full px-6 py-3 leading-none font-semibold rounded-lg text-white bg-gray-900 focus:outline-none"
      
      type="submit">Submit</button>
          </form>
        </div>
      </div>
      </div>
    </>
  );
};

export default CreateProperty;
