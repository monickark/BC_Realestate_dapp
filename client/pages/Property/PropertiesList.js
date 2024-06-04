import React, {useState, useEffect}  from 'react'

import { useStateContext } from '@/context';
import Link from 'next/link';

const PropertiesList = () => {

  const {contract, address, getAllProperties} = useStateContext();
  const[isLoading, setIsLoading] = useState(false)
  const[properties, setProperties] = useState([])

  const fetchProperty = async () => {
    setIsLoading(true);
    alert("start");
    const data = await getAllProperties();
    alert("end");
    console.log("data in index page :", data);
    setProperties(data);
    setIsLoading(true);
  }
  useEffect(() => {
    if(contract)  fetchProperty();
  }, [contract, address])

  return (
    <>
      <div className="flex flex-col min-h-screen mx-auto max-w-xl px-4 pt-4 pb-16">     
        <div className="flex gap-3 h-[82%]">
       <div className="bg-white flex-1 p-3 justify-center items-center">    
        <div className="relative overflow-x-auto">
       <table className="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
            <th scope="col" className="px-6 py-3">
                   Id
                </th>
                <th scope="col" className="px-6 py-3">
                    Owner name
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Property Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Images
                </th>
                <th scope="col" className="px-6 py-3">
                    Property Address
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        { properties ? properties.map((data, i) => (
            <>           
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {data.propId}
                </th>
                <td className="px-6 py-4">
                {data.owner}
                </td>
                <td className="px-6 py-4">
                {data.price}
                </td>
                <td className="px-6 py-4">
                    {data.propTitle}
                </td>
                <td className="px-6 py-4">
                    {data.category}
                </td>
                <td className="px-6 py-4 prop-img">
                    <img src={data.images} alt="Prop Image"/>                    
                </td>
                <td className="px-6 py-4">
                    {data.propAddr}
                </td>
                <td className="px-6 py-4">
                  <Link href={{ pathname: "/Property/SingleProperty" , 
                      query: { id: data.propId} }}> Explore </Link> 
                </td>
            </tr>

            </>              
        )): null}
            
        </tbody>
      </table>
      </div> 
      </div>
      </div> 
      </div>       
    </>
  )
}

export default PropertiesList