import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <div>
        <ul className='bg-zinc-700 flex justify-between p-4 w-full'>
            <li>
                <NavLink to="/" className={({isActive})=>`${isActive ? "text-red-300" : "text-white"} text-2xl`}>Home</NavLink>
            </li>
            <li>
                <NavLink to="/login" className={({isActive})=>`${isActive ? "text-red-300" : "text-white"} text-2xl`}>Login</NavLink>
            </li>
        </ul>
    </div>
  )
}

export default Header