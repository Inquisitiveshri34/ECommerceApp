import express from "express"
import dotenv from "dotenv"
dotenv.config()

import { wrapAsync } from "./utils/wrapAsync.js"
import { connectDB } from "./config/db.js"

const app = express()
const PORT = process.env.PORT || 3000


app.listen(PORT, ()=> {
    connectDB()
    console.log(`Server is running on the port ${PORT}`)
})