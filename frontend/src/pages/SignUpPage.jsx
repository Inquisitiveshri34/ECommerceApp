import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { validateEmail } from '../utils/helper.js'
import axios from "../utils/axios.js"
import Loader from '../components/Loader.jsx'

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState({
        name: "",
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
        setInterval(() => {
        const {name,email,password} = data
        if(!name||!email||!password){
            return alert("All fields are required")
        }
        if (!validateEmail(email)){
            return alert("Enter a valid email")
        }
        if(password.length < 3){
            return alert("Password should be 3 characters long")
        }
        if(name.length < 3){
            return alert("Name should be 3 characters long")
        }
        console.log(data)
        axios.post('/users/register', {
            name,
            email,
            password
        }).then(()=>{
        alert("Signed In Successfully")
        navigate("/login")
        }).catch((err)=>{
            console.log(err)
        }).finally(
            setLoading(false)
        )
    }, 1000);
    }
  return (
    <div className='w-screen h-screen flex justify-center items-center space-x-6 bg-white'>
        {/* Display loading state */}
        {loading && (
            <Loader/>
        )}
        {!loading && (
        <form onSubmit={formHandler} className='bg-[#5BC7E9] w-1/3 rounded-lg p-8 flex flex-col justify-center items-center'>
            <h3 className='text-[#47434C] text-center text-2xl font-semibold m-4'>Sign Up</h3>
            <p className='text-[#47434C]'>Already registered? <Link to="/login" className='text-black hover:underline'>Login now</Link></p>
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="text" name="name" placeholder="Name" value={data.name} onChange={valueHandler} />
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="email" name="email" placeholder="Email" value={data.email} onChange={valueHandler} />
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="password" name="password" placeholder="Password" value={data.password} onChange={valueHandler} />
            <button className="text-white bg-[#47434C] p-3 rounded-lg w-fit m-4" type="submit">Sign Up</button>
        </form>
        )}
        <div className='w-1/3'>
            <img src="./src/assets/3405349.jpg" alt="abc" />
        </div>
    </div>
  )
}

export default SignUpPage