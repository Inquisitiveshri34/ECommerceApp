import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'remixicon/fonts/remixicon.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom'
import Layout from './Layout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import HomePage from './pages/HomePage.jsx'
import AllProductsPage from './pages/AllProductsPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ProductForm from './pages/ProductForm.jsx'
import ProductEdit from './pages/ProductEdit.jsx'
import CartPage from './pages/CartPage.jsx'
import ProductPage from './pages/ProductPage.jsx'
import UserProfile from './pages/UserProfile.jsx'
import AddressForm from './pages/AddressForm.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="" element={<Layout/>}>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/profile" element={<UserProfile/>}/>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<SignUpPage/>}/>
      <Route path="/products" element={<AllProductsPage/>}/>
      <Route path="/product/add" element={<ProductForm/>}/>
      <Route path="/edit/:id" element={<ProductEdit/>}/>
      <Route path="/cart" element={<CartPage/>}/>
      <Route path="/products/:id" element={<ProductPage/>}/>
      <Route path="/users/address" element={<AddressForm/>}/>
    </Route>
    
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)