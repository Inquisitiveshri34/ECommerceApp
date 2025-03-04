import React,{useState,useEffect} from 'react'
import axios from "../utils/axios.js"
import Loader from '../components/Loader.jsx';

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
        {!(productList.length > 0) &&
        <h3 className='m-3 p-3 text-lg'>Please Add Products </h3>
        }
        <h3 className='m-3 p-3 text-lg'>Total Products : {productList.length}</h3>
        {productList.length > 0 &&
                productList.map((product)=>(
                    <div className='m-3 p-3 border rounded grid grid-cols-3' key={product.product._id}>
                        <img src={product.product.images[0]} alt="" className='w-full' />
                        <div className='mx-3'>
                            <h3>{product.product.name}</h3>
                            <p> &#8377; {product.product.price}</p>
                            <p>Quantity: {product.quantity}</p>
                        </div>
                        <p className='text-end'>Cost : &#8377; {product.product.price * product.quantity}</p>
                    </div>
                ))
        }
        <p className='text-end m-3 p-3'>Total Cost: &#8377; {productList.length > 0 ? productList.map((product)=>(product.product.price * product.quantity)).reduce((sum,ele)=>(sum+ele)) : 0}</p>
        
    </div>
  )
}

export default CartPage