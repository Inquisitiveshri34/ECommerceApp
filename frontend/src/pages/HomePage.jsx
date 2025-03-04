import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import axios from '../utils/axios.js'
import Loader from '../components/Loader.jsx'

const HomePage = () => {
  const [data,setData] = useState([])
  const [loading, setLoading] = useState(false);
  useEffect(()=>{
    const fetchData = () =>{
      setLoading(true);
      setInterval(() => {
      axios.get("/products/all").then((response)=>{
        setData(response.data)
        }).catch((err)=>{
            console.log(err)
        }).finally(
          setLoading(false)
        )
      }, 1000);
    }
    fetchData()
  },[])
  

  return (
    <div>
      {/* Display loading state */}
      {loading && (
        <Loader/>
      )}
      {!loading && (
      <div className="ProductContainer m-3 p-4 grid gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
        {data.map((product,i)=>(
          <ProductCard data={product} key={i}/>
        ))}
      </div>
      )}
    </div>
  )
}

export default HomePage