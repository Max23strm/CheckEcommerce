"use strict";

var express = require("express");
const { listProducts } = require("../models/model");
const model = require("../models/model");
var router = express.Router();
module.exports = router;

const models = require("../models/model");

// escriban sus rutas acá
// siéntanse libres de dividir entre archivos si lo necesitan

router.get('/categories',(req,res)=>{
    res.json(model.listCategories())
})

router.post('/categories',(req,res)=>{
    const {category}=req.body

    try {
        res.status(201).json({msg:model.addCategory(category)})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

router.get('/products',(req,res)=>{
    res.json(model.listProducts())
})

router.post('/products',(req,res)=>{
    const {name, brand, category, stock}=req.body
    try{
        res.status(201).json(model.addProduct(name, brand,category,stock))
    } catch(error){
        res.status(404).json({error:error.message})
    }
})

router.get('/products/:categoryName',(req,res)=>{
    const {categoryName}=req.params
    const {fullName}=req.query

    try {
        res.status(200).json(listProducts(categoryName,fullName))
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

router.get("/reviews",(req,res)=>{
    const {name}=req.query

    try {
        res.status(200).json(model.getReviews(name))
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})

router.post("/reviews",(req,res)=>{
    const {name,stars,text,user}=req.body

    try {
        res.status(201).json({msg:model.addReview(name,stars,text,user)})
    } catch (error) {
        res.status(400).json({error:error.message})
    }
})

router.get('/rating',(req,res)=>{
    res.json(model.getRating())
})
router.get('/rating/:product',(req,res)=>{
    const {product}=req.params
    try {
        res.json({rating:model.getRating(product)})
        
    } catch (error) {
        res.status(404).json({error:error.message})
    }
})
