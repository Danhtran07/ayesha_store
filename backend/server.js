const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")

const app = express()
const authRoutes = require("./routes/authRoutes")

app.use(cors())
app.use(express.json())

app.get("/", (req,res)=>{
    res.send("API running")
})

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log(err))

const productRoutes = require("./routes/productRoutes")

app.use("/api/products",productRoutes)
app.use("/api/auth", authRoutes)

app.listen(5000,()=>{
    console.log("Server running on port 5000")
})