import Product from "../models/product.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import mongoose from "mongoose";

const createProduct = wrapAsync(async (req,res) => {
    const {name,price} = req.body;
    if(
        [name,price].some((field)=>(
            field?.trim() == ""
        ))
    ){
        return res.status(400).send("All fields are required")
    }
    if (price < 0) {
        return res.status(400).send("Price cannot be negative")
    }
    const existedProduct = await Product.findOne({name})
    if (existedProduct){
        return res.status(400).send("Product pre-exists")
    }
    const imagesArray = req.files;
    if(!imagesArray){
        return res.status(400).send("At least 1 image is required")
    }
    const images = await Promise.all(imagesArray.map(async (img) => {
        try {
          const response = await uploadOnCloudinary(img.path);
          console.log(response);
          return response;
        } catch (err) {
          console.error("Error uploading image:", err);
          return "";
        }
      }));  
    const product = await Product.create({
        name, 
        price,
        images
    })
    const createdProduct = await Product.findOne({name})
    console.log(createdProduct)
    res.status(200).send(createdProduct)
})

const showProducts = wrapAsync(async(req,res)=>{
    const products = await Product.find({})
    res.status(200).send(products)
})

const showProduct = wrapAsync(async(req,res)=>{
    const {id} = req.params
    if (!id){
        return res.status(400).send("Id not found")
    }
    const product = await Product.findById(id)
    if (!product){
        return res.status(400).send("Wrong Id")
    }
    res.status(200).send(product)
})

const updateProduct = wrapAsync(async(req,res)=>{
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid product ID'); 
    }
    const {name, description, price} = req.body;
    if(!name || name.trim() == ""){
        return res.status(400).send("All fields are required")
    }
    if (price < 0) {
        return res.status(400).send("Price cannot be negative")
    }
    const editedProduct = await Product.findByIdAndUpdate(id,{name,description,price},{new:true})
    if (!editedProduct){
        return res.status(400).send("Product not found")
    }
    res.status(200).send(editedProduct)
})

const deleteProduct = wrapAsync(async(req,res)=>{
    const id = req.params.id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid product ID'); 
    }
    const deletedProduct = await Product.findByIdAndDelete(id)
    if (!deletedProduct){
        return res.status(400).send("Product not found")
    }
    res.status(200).send(deletedProduct)
})

export {createProduct,showProducts,showProduct,updateProduct,deleteProduct}