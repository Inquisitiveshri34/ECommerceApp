import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "../utils/axios.js"
import { validateEmail } from '../utils/helper.js'
import Loader from '../components/Loader.jsx'

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const valueHandler = (e) =>{
        setData((prevData)=>({...prevData,[e.target.name]: e.target.value}))
    }
    const formHandler = (e) =>{
        e.preventDefault()
        setLoading(true);
        setTimeout(() => {
        const {email,password} = data
        if(!email||!password){
            return alert("All fields are required")
        }
        if (!validateEmail(email)){
            return alert("Enter a valid email")
        }
        if(password.length < 3){
            return alert("Password should be 3 characters long")
        }
        axios.post('/users/login', {
            email,
            password
        }).then((response)=>{
        console.log(response)
        localStorage.setItem("token",response.data.token)
        alert("Logged In Successfully")
        navigate("/")
        }).catch((err)=>{
            console.log(err)
            alert("Some Error occured")
        }).finally(
            setLoading(false)
        )
        }, 1000);
    }
  return (
    <div className='w-screen h-screen flex justify-center items-center space-x-6 bg-white'>
        <div className='w-1/3'>
            <img src="./src/assets/3405349.jpg" className='rounded-4xl' alt="abc" />
        </div>
        {loading && (
            <Loader/>
        )}
        {!loading && (
            <form onSubmit={formHandler} className='bg-[#5BC7E9] w-1/3 rounded-lg p-8 flex flex-col justify-center items-center'>
                <h3 className='text-[#47434C] text-center text-2xl font-semibold m-4'>Login</h3>
                <p className='text-[#47434C]'>Not a registered user? <Link to="/register" className='text-black hover:underline'>Sign up now</Link></p>
                <input className='bg-white w-8/12  rounded outline-none p-3 m-4' type="email" name="email" placeholder="Enter Email..." value={data.email} onChange={valueHandler} />
                <input className='bg-white w-8/12  rounded outline-none p-3 m-4' type="password" name="password" placeholder="Enter Password..." value={data.password} onChange={valueHandler} />
                <button className="text-white bg-[#47434C] p-3 rounded-md w-fit m-4" type="submit">Login</button>
            </form>
        )}
    </div>
  )
}

export default LoginPage