import React,{useState} from 'react'
import axios from "../utils/axios.js"
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader.jsx'

const ProductForm = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [data,setData] = useState({
        name: "",
        description: "",
        price: "",
    })
    const [files,setFiles] = useState()
    const [error, setError] = useState(null);
    const valueHandler = (e) => {
        setData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
    }
    const fileHandler = (e) =>{
        setFiles(e.target.files)
    }
    
    const formHandler = (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setInterval(() => {
        const { name, description, price } = data;
        if (!name || !description || !price) {
          setLoading(false); 
          return setError("All fields are required.");
        }
        if (files.length === 0) {
          setLoading(false); 
          return setError("Please select at least one file.");
        }
        if (price <= 0) {
          setLoading(false); 
          return setError("Price must be greater than 0.");
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", price);

        for (let i = 0; i < files.length; i++) {
          formData.append("files", files[i]);
        }


        axios.post('/products/create',formData, {
              headers: {
                  "Content-Type": "multipart/form-data",
              },
          }).then(()=>{
          alert("Product Added")
          navigate("/")
          }).catch((err)=>{
              setError(err)
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
        <form onSubmit={formHandler} className='bg-[#5BC7E9] w-1/3 rounded-lg p-8 flex flex-col justify-center items-center'>
            {/* Display error message */}
            {error && <div className="text-red-600 mb-4">{error}</div>}
            <h3 className='text-[#47434C] text-center text-2xl font-semibold m-4'>New Product</h3>
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="text" name="name" placeholder="Enter Name" onChange={valueHandler} required/>
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="text" name="description" placeholder="Enter Description" onChange={valueHandler}/>
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="number" name="price" placeholder="Enter Price" onChange={valueHandler} required/>
            <input type="file" name="productimg" id="1" multiple onChange={fileHandler} required/>
            <button className="text-white bg-[#47434C] p-3 rounded-lg w-fit m-4" type="submit">Add Product</button>
        </form>
      )}
    </div>
    
  )
}

export default ProductForm