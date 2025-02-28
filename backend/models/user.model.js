import mongoose from "mongoose"
import bcrypt from "bcrypt"

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
    }
})

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next()
})

const User = mongoose.model("User",userSchema)

export default User;