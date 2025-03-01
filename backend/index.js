import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"


import { connectDB } from "./config/db.js"


const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

import userRouter from "./routes/user.route.js"


app.use("/users",userRouter)

app.listen(PORT, ()=> {
    connectDB()
    console.log(`Server is running on the port ${PORT}`)
})