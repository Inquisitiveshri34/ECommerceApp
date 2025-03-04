import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import axios from '../utils/axios.js'
import Loader from '../components/Loader.jsx'

const AllProductsPage = () => {
  const [productList,setProductList] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filterData,setFilterData] = useState({
    min: "",
    max: ""
  })
  const valueHandler = (e) => {
    const { name, value } = e.target;
    setFilterData((prevData) => ({
      ...prevData,
      [name]: value ? parseInt(value) : "",
    }));
  };
  const [loading, setLoading] = useState(false);
  const fetchData = () =>{
    setLoading(true);
    setTimeout(() => {
    axios.get("/products/all").then((response)=>{
      setProductList(response.data)
      setFilteredProducts(response.data);
      }).catch((err)=>{
          console.log(err)
      }).finally(
        setLoading(false)
      )
    }, 1000);
  }
  useEffect(()=>{
    fetchData()
  },[])
  const filterHandler = () => {
    const filtered = productList.filter((product) => product.price >= filterData.min && product.price <= filterData.max);
    setFilteredProducts(filtered);
  };
  return (
    <div className='m-3 p-4'>
      {/* Display loading state */}
      {loading && (
        <Loader/>
      )}
      {!loading && (
        <>
          <div className="filterComponent m-3 flex space-x-2">
              <h3 className="">Price Range: </h3>
              <input className='bg-white w-1/12 px-2 rounded outline-none border' type="number" name="min" placeholder='min' min="0" value={filterData.min} onChange={valueHandler}/>
              <input className='bg-white w-1/12 px-2 rounded outline-none border' type="number" name="max" placeholder='max' max="1000000" value={filterData.max} onChange={valueHandler}/>
              <button className=" bg-[#5BC7E9] px-2 rounded w-fit" onClick={filterHandler}>Apply</button>
          </div>
          <div className="ProductContainer m-3 grid gap-3 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
            {filteredProducts.map((product,i)=>(
              <ProductCard data={product} key={i}/>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default AllProductsPage