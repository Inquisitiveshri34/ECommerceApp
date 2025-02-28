import User from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const registerUser = async (req,res) => {
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
    const profilePicLocalPath = req.files?.profilePic[0]?.path
    if(!profilePicLocalPath){
        return res.status(400).send("Image can't be uploaded")
    }
    const profilePic = await uploadOnCloudinary(profilePicLocalPath)
    if(!profilePic){
        return res.status(400).send("Pic couldn't be uploaded")
    }
    const user = await User.create({
        name, email, password, profilePic: profilePic.url
    })
    const createdUser = await User.findOne({email})
    res.status(200).send(createdUser)
}

export {registerUser}