import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {
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
        console.log(data)
        alert("Logged In Successfully")
        navigate("/")
    }
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-zinc-400'>
        <form onSubmit={formHandler} className='bg-zinc-700 w-1/3 rounded-lg p-8 flex flex-col justify-center items-center'>
            <h3 className='text-white text-center text-2xl font-semibold m-4'>Login</h3>
            <input className='bg-white w-8/12  rounded outline-none p-3 m-4' type="text" name="email" placeholder="Enter Email..." value={data.email} onChange={valueHandler} />
            <input className='bg-white w-8/12  rounded outline-none p-3 m-4' type="text" name="password" placeholder="Enter Password..." value={data.password} onChange={valueHandler} />
            <button className="text-white bg-blue-600 p-3 rounded-md w-fit m-4" type="submit">Login</button>
        </form>
    </div>
  )
}

export default LoginPage