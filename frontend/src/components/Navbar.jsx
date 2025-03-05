import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      <ul className="bg-[#47434C] hidden md:flex justify-between p-4 w-full">
        <li>
          <NavLink to="/" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/products" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
            My Products
          </NavLink>
        </li>
        <li>
          <NavLink to="/product/add" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
            Add Product
          </NavLink>
        </li>
        <li>
          <NavLink to="/cart" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
            <i class="ri-user-3-line"></i>
          </NavLink>
        </li>
      </ul>

      <div className="md:hidden flex justify-between items-center p-4 bg-[#47434C]">
        <button onClick={handleMenuToggle} className="text-white text-3xl">
          {isMenuOpen ? <i class="ri-close-line"></i> : <i class="ri-menu-line"></i>} 
        </button>
      </div>

      {isMenuOpen && (
        <ul className="bg-[#47434C] md:hidden flex flex-col p-4 w-full">
          <li>
            <NavLink to="/" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
              My Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/product/add" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
              Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/cart" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={({ isActive }) => `${isActive ? "underline underline-offset-6" : "underline-none"} text-white text-2xl`}>
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;