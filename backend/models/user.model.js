import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required:true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    profilePic: {
        type: String,
        default: "https://res.cloudinary.com/dbinjibgr/image/upload/v1741160215/Sample_User_Icon_f4kzgk.png"
    },
    addressArr : [{
            addressType: {
                type: String
            },
            address1: {
                type: String
            },
            address2: {
                type: String
            },
            city: {
                type: String
            },
            country: {
                type: String
            },
            zipCode: {
                type: Number,
                min: 100000,
                max: 999999,
            },
    }],
    cart: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },  
            quantity: { type: Number, default: 1 },  
            _id : false
        },
      ],
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateJWT = function(){
    return jwt.sign(
        {   
            id: this._id,
            name: this.name,
            email:this.email,
        },
        process.env.JWT_SECRET)
}


const User = mongoose.model("User",userSchema)

export default User;