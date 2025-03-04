import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({data}) => {
  return (
    <div className='m-3 p-4 w-80 h-fit shadow-gray-400 shadow border rounded-xl'>
        <img src={data.images[0]} alt="img" className='w-70 h-70 rounded-lg border border-gray-400' />
        <h3 className='p-1 text-lg font-bold'>{data.name}</h3>
        <p className='p-1'> &#8377; {data.price}</p>
        <button><Link to={`/edit/${data._id}`} className='p-1.5 rounded bg-[#5BC7E9]'>Edit</Link></button>
    </div>
  )
}

export default ProductCard