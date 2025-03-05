import React,{useState,useEffect} from 'react'
import axios from "../utils/axios.js"
import Loader from '../components/Loader.jsx';
import CartProduct from '../components/CartProduct.jsx';

const CartPage = () => {
    const [loading, setLoading] = useState(false);
    const [productList,setProductList] = useState([])
    const token = localStorage.getItem('token');
    useEffect(()=>{
        const fetchData = () =>{
            setLoading(true);
            if (token){
                setTimeout(() => {
                axios.get(`users/product/cart`,{
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response)=>{
                    setProductList(response.data)
                })
                .catch((err)=>{
                    console.log(err.message || 'Something went wrong');
                })
                .finally(
                    setLoading(false)
                )
                }, 1000);
            }
        }
        fetchData()
        },[token])
  return (
    <div>
        {loading && (
            <Loader/>
        )}
        <h3 className='m-3 p-3 text-lg'>Total Products : {productList.length}</h3>
        {!(productList.length > 0 ) ? 
        <h3 className='m-3 p-3 text-lg'>Please Add Products </h3> :
        productList.map((product)=> (<CartProduct product={product} key={product.product._id}/>)) }
    </div>
  )
}

export default CartPage