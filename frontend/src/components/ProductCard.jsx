import React from 'react'

const ProductCard = ({data}) => {
  return (
    <div className='m-3 p-4 w-min-1/5 shadow-gray-400 shadow border rounded-xl'>
        <img src={data.images[0]} alt="img" className='w-70 h-70 rounded-lg border border-gray-400' />
        <h3>{data.name}</h3>
        <p>{data.price}</p>
    </div>
  )
}

export default ProductCard