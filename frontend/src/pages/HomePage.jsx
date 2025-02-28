import React from 'react'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const productList = [
    {
      id: 1,
      name: "Product1",
      price: 100,
      image: "img"
    },
    {
      id: 2,
      name: "Product2",
      price: 100,
      image: "img"
    },
    {
      id: 3,
      name: "Product3",
      price: 100,
      image: "img"
    },
    {
      id: 4,
      name: "Product4",
      price: 100,
      image: "img"
    }
  ]
  return (
    <div>
      <div className="ProductContainer m-3 p-4 flex flex-wrap justify-evenly">
        {productList.map((product,i)=>(
          <ProductCard data={product} key={i}/>
        ))}
      </div>
    </div>
  )
}

export default HomePage