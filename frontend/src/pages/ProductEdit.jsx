import React,{useState,useEffect} from 'react'
import axios from "../utils/axios.js"
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader.jsx';

const ProductEdit = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const {id} = useParams()
    const [data,setData] = useState({
            name: "",
            description: "",
            price: "",
        })
    const [images,setImages] = useState([])       
    useEffect(()=>{
        const fetchData = () =>{
            setLoading(true);
            setTimeout(() => {
            axios.get(`/products/${id}`).then((response)=>{
                const { name, description, price } = response.data
                setData({name,description : description || "",price})
                setImages(response.data.images)
                }).catch((err)=>{
                    console.log(err)
                }).finally(
                setLoading(false)
                )
            }, 1000);
            }
        fetchData()
    },[id])
    const valueHandler = (e) => {
        setData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
    }
    const formHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setTimeout(() => {
        const { name, description, price } = data;
        if (!name || !price) {
          setLoading(false); 
          return setError("All fields are required.");
        }
        if (price <= 0) {
          setLoading(false); 
          return setError("Price must be greater than 0.");
        }
        axios.put(`/products/${id}`,{
            name,
            description: description || "",
            price
        }).then(()=>{
          alert("Product Updated")
          navigate("/")
          }).catch((err)=>{
            setError(err.message || 'Something went wrong');
          }).finally(
            setLoading(false)
        )

        console.log(error)
        }, 1000);
    };
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
      {/* Display loading state */}
      {loading && (
        <Loader/>
      )}
      {!loading && (
        <form onSubmit={formHandler} className='bg-[#5BC7E9] w-min-1/3 rounded-lg p-8 flex flex-col justify-center items-center'>
            {/* Display error message */}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <h3 className='text-[#47434C] text-center text-2xl font-semibold m-4'>Edit Product</h3>
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="text" name="name" placeholder="Enter Name" value={data.name} onChange={valueHandler} required/>
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="text" name="description" placeholder="Enter Description" value={data.description} onChange={valueHandler}/>
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="number" name="price" placeholder="Enter Price" value={data.price} onChange={valueHandler} required/>
            <div className='flex gap-3'>
                {images.map((img)=>(<img src={img} alt="img" className='h-50'/>))}
            </div>
            <button className="text-white bg-[#47434C] p-3 rounded-lg w-fit m-4" type="submit">Edit Product</button>
        </form>
      )}
    </div>
  )
}

export default ProductEdit