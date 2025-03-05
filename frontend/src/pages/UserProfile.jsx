import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "../utils/axios.js"
import Loader from '../components/Loader.jsx'

const UserProfile = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [user,setUser] = useState()
    const token = localStorage.getItem("token")
    useEffect(() => {
        if(!token){
            navigate("/login")
            return;
        }
        setLoading(true);
        axios.get("users/profile",{
            headers :{
                Authorization : `Bearer ${token}`
            }
        }).then((response)=>{
            setUser(response.data)
        }).catch((err)=>{
            console.log(err)
        }).finally(() => {
            setLoading(false); 
        });
    }, [token])
    console.log(user)
    const addAddress = () => {
        
    }
  return (
    <div className='w-screen h-screen m-3 p-3 bg-white'>
        {loading ? (
                <Loader /> 
            ) : (
                user && (
                    <div>
                        <div>
                            <div className='rounded-full w-50 h-50 border flex items-end'>
                                <img src={user.profilePic} alt="" className='w-full h-full' />
                            </div>
                            <p>Name: {user.name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                        <div>
                            <h3>Addresses: </h3>
                            {(user.addressArr.length > 0) ? (
                                null
                            ) : (
                                <h3>No address found.</h3>
                            )}
                            <button onClick={addAddress}>Add Address</button>
                        </div>
                    </div>
                )
            )}
    </div>
  )
}

export default UserProfile