import React, {useState, useEffect}  from 'react'

import { useStateContext } from '@/context';

const CreateProperty = () => {
    const {createPropertyFunction} = useStateContext(); 
    const[isLoading, setIsLoading] = useState(false);    
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

  return (
    <>
    <div>Create Property</div>
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
    </>
  )
}

export default CreateProperty