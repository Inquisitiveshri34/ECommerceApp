import React,{useState,useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "../utils/axios.js"
import Loader from '../components/Loader.jsx'

const ProductPage = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState({})
    const [quantity,setQuantity] = useState(1)
    const quantityHandler = (e) => {
        setQuantity((e == "i") ? quantity+1 : ((quantity > 0) ?  quantity-1 : quantity))
    }
    console.log(data)
    useEffect(()=>{
        const fetchData = () =>{
            setLoading(true);
            setTimeout(() => {
            axios.get(`/products/${id}`).then((response)=>{
                setData(response.data)
                }).catch((err)=>{
                    console.log(err)
                }).finally(
                setLoading(false)
                )
            }, 1000);
            }
        fetchData()
    },[id])
    const cartHandler = () => {
        setLoading(true);
        console.log(id)
        navigate("/cart")
        // setTimeout(() => {
        // axios.put(``,{quantity})
        // .then(()=>{
        //     alert("Product Added to Cart")
        //     navigate("/")
        // })
        // .catch((err)=>{
        //     console.log(err.message || 'Something went wrong');
        // })
        // .finally(
        //     setLoading(false)
        // )
        // }, 1000);
    };
  return (
    <div className='w-screen h-screen m-3 p-4 flex'>
      {/* Display loading state */}
      {loading && (
        <Loader/>
      )}
      {!loading && (
        <>
        <div className='w-1/2 h-2/3 overflow-y-scroll rounded-lg'>
            {data.images && data.images.map((image)=>(
            <img src={image} alt="img" className='rounded-lg border border-gray-400' />
            ))}
        </div>
        <div className='m-2 p-3'>
            <h3 className='p-1 text-lg font-bold'>{data.name}</h3>
            <p className='p-1'>{data.description}</p>
            <p className='p-1'> &#8377; {data.price}</p>
            <div className="quantity flex space-x-2 my-3">
                <button onClick={()=>{quantityHandler("i")}}><i class="ri-add-line p-3 bg-[#5BC7E9] rounded"></i></button>
                <p className='text-lg font-bold'>Quantity: {quantity}</p>
                <button onClick={()=>{quantityHandler("d")}}><i class="ri-subtract-line p-3 bg-[#5BC7E9] rounded"></i></button>
            </div>
            <button onClick={cartHandler} className='p-3 bg-[#5BC7E9] rounded font-semibold'>Add to Cart</button>
        </div>
        </>
      )}
    </div>
  )
}

export default ProductPage