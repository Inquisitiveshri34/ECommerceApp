import React,{useState} from 'react'
import axios from "../utils/axios.js"
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader.jsx'

const AddressForm = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState({
            addressType: "",
            address1: "",
            address2: "",
            city: "",
            country: "",
            zipCode: "",
    })
    const [error, setError] = useState(null);
    const valueHandler = (e) => {
        setData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
    }
    const formHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setTimeout(() => {
        const {  country, city, address1, address2, zipCode, addressType } = data;
        if (!country || !city || !address1 || !address2 || !zipCode || !addressType) {
          setLoading(false); 
          return setError("All fields are required.");
        }
        axios.post('/users/address',{  country, city, address1, address2, zipCode, addressType }, {
              headers: {
                  Authorization: `Bearer ${token}`
              },
          }).then(()=>{
          alert("Address Added")
          navigate("/profile")
          }).catch((err)=>{
            console.log(err)
              setError("Some Error Occured")
          }).finally(
            setLoading(false)
          )
        }, 1000);
    };
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      {/* Display loading state */}
      {loading && (
        <Loader/>
      )}
      {!loading && (
        <form onSubmit={formHandler} className='bg-[#5BC7E9] w-1/2 rounded-lg p-8 flex flex-col justify-center items-center'>
            {/* Display error message */}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <h3 className='text-[#47434C] text-center text-2xl font-semibold m-4'>New Address</h3>
            <div className='w-full items-center grid grid-cols-4'>
                <label htmlFor="addressType" className='inline m-3'>Address Type: </label>
                <input className='bg-white rounded outline-none p-3 m-4 col-span-3' type="text" name="addressType" placeholder="i.e. Home, Work, etc." onChange={valueHandler} required/>
            </div>
            <div className='w-full items-center grid grid-cols-4'>
                <label htmlFor="address1" className='inline m-3'>Address Line 1: </label>
                <input className='bg-white rounded outline-none p-3 m-4 col-span-3' type="text" name="address1" placeholder="Address Line 1..." onChange={valueHandler} required/>
            </div>
            <div className='w-full items-center grid grid-cols-4'>
                <label htmlFor="address2" className='inline m-3'>Address Line 2: </label>
                <input className='bg-white rounded outline-none p-3 m-4 col-span-3' type="text" name="address2" placeholder="Address Line 2..." onChange={valueHandler} required/>
            </div>
            <div className='w-full items-center grid grid-cols-4'>
                <label htmlFor="city" className='inline m-3'>City: </label>
                <input className='bg-white rounded outline-none p-3 m-4 col-span-3' type="text" name="city" placeholder="City..." onChange={valueHandler} required/>
            </div>
            <div className='w-full items-center grid grid-cols-4'>
                <label htmlFor="country" className='inline m-3'>Country: </label>
                <input className='bg-white rounded outline-none p-3 m-4 col-span-3' type="text" name="country" placeholder="Country..." onChange={valueHandler} required/>
            </div>
            <div className='w-full items-center grid grid-cols-4'>
                <label htmlFor="zipCode" className='inline m-3'>Zip Code: </label>
                <input className='bg-white rounded outline-none p-3 m-4 col-span-3' type="number" min="100000" max="999999" name="zipCode" placeholder="Zip Code..." onChange={valueHandler} required/>
            </div>
            <button className="text-white bg-[#47434C] p-3 rounded-lg w-fit m-4" type="submit">Add Address</button>
        </form>
      )}
    </div>
  )
}

export default AddressForm