const Product = require('../Model/productModel')

exports.createProducts = async ( req , res) => {
    try{
       const item = req.body 
       const result = await Product.create(item)
       res.json(result)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.getProducts = async (req , res) => {
    try{
        const products = await Product.find()
        res.json(products)
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
}