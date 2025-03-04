import React from 'react'
import { Link } from 'react-router-dom'
import axios from "../utils/axios.js"


const ProductCard = ({data}) => {
  const deleteProduct = () => {
    const result = window.confirm("Are you sure you want to permanently DELETE the product?");
    if (result) {
      axios.delete(`/products/${data._id}`).then(()=>{
      alert("Product Deleted")
      window.location.reload();
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  return (
    <div className='m-3 p-4 w-80 h-fit shadow-gray-400 shadow border rounded-xl'>
        <img src={data.images[0]} alt="img" className='w-70 h-70 rounded-lg border border-gray-400' />
        <h3 className='p-1 text-lg font-bold'>{data.name}</h3>
        <p className='p-1'> &#8377; {data.price}</p>
        <div>
          <button className='p-1.5 m-1.5 rounded bg-[#5BC7E9] text-white'><Link to={`/edit/${data._id}`}><i class="ri-edit-line"></i></Link></button>
          <button onClick={deleteProduct} className='p-1.5 m-1.5 rounded bg-red-600 text-white'><i class="ri-delete-bin-line"></i></button>
        </div>
        <div>
          <button className='p-1.5 m-1.5 rounded bg-[#5BC7E9] text-white'><Link to={`/products/${data._id}`}>View</Link></button>
        </div>
    </div>
  )
}

export default ProductCard