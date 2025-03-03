import React,{useState} from 'react'
import axios from "../utils/axios.js"
import { useNavigate } from 'react-router-dom'

const ProductForm = () => {
    const navigate = useNavigate()
    const [data,setData] = useState({
        name: "",
        price: "",
    })
    const [files,setFiles] = useState()
    const valueHandler = (e) => {
        setData((prevData)=>({...prevData,[e.target.name]:e.target.value}))
    }
    const fileHandler = (e) =>{
        setFiles(e.target.files)
    }
    
    const formHandler = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        const { name, price } = data;
        formData.append("name", name);
        formData.append("price", price);
        // Ensure 'files' contains the files selected by the user
        if (files && files.length > 0) {
          // Loop through the files and append them to the FormData object
          for (let i = 0; i < files.length; i++) {
            formData.append("files", files[i]); // Append files under the same key "files"
            console.log(files[i]); // Logs each file object
          }
          // Inspect FormData by using formData.forEach
          formData.forEach((value, key) => {
            console.log(key, value); // Logs the formData key-value pairs
          });
          console.log("FormData length: ", files.length); // Just checking how many files


          axios.post('/products/create',formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }).then(()=>{
            console.log(data)
            alert("Product Added")
            navigate("/")
            }).catch((err)=>{
                console.log(err)
                alert("Some Error occured")
            })
        } else {
          alert("No files selected!");
        }
    };
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
        <form onSubmit={formHandler} className='bg-[#5BC7E9] w-1/3 rounded-lg p-8 flex flex-col justify-center items-center'>
            <h3 className='text-[#47434C] text-center text-2xl font-semibold m-4'>New Product</h3>
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="text" name="name" placeholder="Enter Name" onChange={valueHandler} required/>
            <input className='bg-white w-8/12 rounded outline-none p-3 m-4' type="number" name="price" placeholder="Enter Price" onChange={valueHandler} required/>
            <input type="file" name="productimg" id="1" multiple onChange={fileHandler} required/>
            <button className="text-white bg-[#47434C] p-3 rounded-lg w-fit m-4" type="submit">Add Product</button>
        </form>
    </div>
  )
}

export default ProductForm