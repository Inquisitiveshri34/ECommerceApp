import Product from "../models/product.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { wrapAsync } from "../utils/wrapAsync.js";

const createProduct = wrapAsync(async (req,res) => {
    const {name,price} = req.body;
    if(
        [name,price].some((field)=>(
            field?.trim() == ""
        ))
    ){
        return res.status(400).send("All fields are required")
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

export {createProduct,showProducts}