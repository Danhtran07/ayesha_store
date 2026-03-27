const Product = require("../models/Product")

//lay danh sach san pham
exports.getProducts = async (req,res)=>{
    const products = await Product.find()
    res.json(products)
}

// them san pham moi
exports.createProduct = async (req,res)=>{
    const product = new Product(req.body)
    await product.save()
    res.json(product)
}