import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from '../utils/axios.js'

const HomePage = () => {
  const [data,setData] = useState([])
  useEffect(()=>{
    const fetchData = () =>{
      axios.get("/products/all").then((response)=>{
        console.log(response.data)
        setData(response.data)
        }).catch((err)=>{
            console.log(err)
            alert("Some Error occured")
        })
    }
    fetchData()
  },[])
  

  return (
    <div>
      <div className="ProductContainer m-3 p-4 flex flex-wrap justify-evenly">
        {data.map((product,i)=>(
          <ProductCard data={product} key={i}/>
        ))}
      </div>
    </div>
  )
}

export default HomePage