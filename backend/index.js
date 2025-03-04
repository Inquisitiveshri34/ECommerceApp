import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import cookieParser from "cookie-parser"


import { connectDB } from "./config/db.js"


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
app.use(cookieParser())

import userRouter from "./routes/user.route.js"
import productRouter from "./routes/product.route.js"


app.use("/users",userRouter)
app.use("/products",productRouter)

app.listen(PORT, ()=> {
    connectDB()
    console.log(`Server is running on the port ${PORT}`)
})