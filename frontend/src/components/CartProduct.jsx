import React, { useEffect, useState } from 'react'
import Loader from '../components/Loader.jsx';
import axios from "../utils/axios.js"

const CartProduct = ({product}) => {
    const [loading, setLoading] = useState(false);
    const [quantity,setQuantity] = useState(product.quantity)
    const productId = product.product._id
    const quantityHandler = (e) => {
        setQuantity((e == "i") ? quantity+1 : ((quantity > 0) ?  quantity-1 : quantity))
    }
    useEffect(() => {
        setLoading(true)
        const token = localStorage.getItem('token');
        if (token){
            setTimeout(() => {
            axios.put(`users/product/${productId}`,{
                quantity,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then()
            .catch((err)=>{
                console.log(err.message || 'Something went wrong');
            })
            .finally(
                setLoading(false)
            )
            }, 1000);
        }

    }, [quantity,productId])
    
  return (
    <>    
        {loading ?
            (<Loader/>) : (
            <div className='m-3 p-3 border rounded grid grid-cols-3' key={product.product._id}>
                <img src={product.product.images[0]} alt="" className='w-full' />
                <div className='mx-3'>
                    <h3 className='text-2xl font-bold'>{product.product.name}</h3>
                    <p> &#8377; {product.product.price}</p>
                    <div className="quantity flex space-x-2 my-3">
                        <button onClick={()=>{quantityHandler("i")}}><i class="ri-add-line p-3 bg-[#5BC7E9] rounded"></i></button>
                        <p>Quantity: {quantity}</p>
                        <button onClick={()=>{quantityHandler("d")}}><i class="ri-subtract-line p-3 bg-[#5BC7E9] rounded"></i></button>
                    </div>
                </div>
                <p className='text-end'>Cost : &#8377; {product.product.price * quantity}</p>
            </div>
        )}
        
    </>
  )
}

export default CartProduct