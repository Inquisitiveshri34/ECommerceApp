import User from "../models/user.model.js"
import Product from "../models/product.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { wrapAsync } from "../utils/wrapAsync.js";
import mongoose from "mongoose";


const registerUser = wrapAsync(async (req,res) => {
        const {name,email,password} = req.body;
        if(
            [name,email,password].some((field)=>(
                field?.trim() == ""
            ))
        ){
            return res.status(400).send("All fields are required")
        }
        const existedUser = await User.findOne({
            $or : [{name},{email}]
        })
        if (existedUser){
            return res.status(400).send("User pre-exists")
        }
        // const profilePicLocalPath = req.files?.profilePic[0]?.path
        // if(!profilePicLocalPath){
        //     res.status(400).send("Image can't be uploaded")
        // }
        // const profilePic = await uploadOnCloudinary(profilePicLocalPath)
        // if(!profilePic){
        //     res.status(400).send("Pic couldn't be uploaded")
        // }
        const user = await User.create({
            name, email, password
        })
        const createdUser = await User.findOne({email})
        res.status(200).send(createdUser)
})

const loginUser = wrapAsync(async (req,res) => {
        const {email, password } = req.body
        if (!email || !password){
            return res.status(400).send("Field cannot be empty")
        }
        const user = await User.findOne({ email }).select("+password")
        if (!user){
            return res.status(400).send("User Not Found")
        }
        const isPasswordValid = await user.isPasswordCorrect(password)
        if (!isPasswordValid) {
            return res.status(400).send("Wrong credentials")
        }
        const token = await user.generateJWT()
        delete user._doc.password;
        res.status(200).json({user,token})
})

const addProductToCart = wrapAsync(async(req,res) => {
    const productId = req.params.id
    console.log(productId)
    const {quantity} = req.body
    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(400).send('Invalid product ID'); 
    }
    const product = await Product.findById(productId)
    if(!product){
        return res.status(400).send("Product not found")
    }
    console.log(product)
    const user = await User.findByIdAndUpdate(req.user.id,{$push: 
        {cart : {product : productId, quantity}}
    },{new:true})
    console.log(user)
    res.status(200).json(user)
})

const showCartItems = wrapAsync(async(req,res)=>{
    const user = await User.findById(req.user.id)
        .populate({
            path: 'cart.product',
            select: 'name price description images', 
        });
    if (!user){
        return res.status(400).send("User not found")
    }
    res.status(200).send(user.cart)
})


export {registerUser,loginUser,addProductToCart,showCartItems }