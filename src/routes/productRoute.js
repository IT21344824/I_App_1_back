const express = require('express')
const router = express.Router();

let Product = require("../models/Product");

//add item
router.route("/add").post((req,res) => {
    const name = req.body.name;
    const quantity = req.body.quantity;
    const description = req.body.description;

    const newProduct = new Product({
        name, quantity, description
    })

    newProduct.save().then(() => {
        res.json("prodcut added")
    }).catch((err) => {
        console.log(err);
    })
})

//get all items
router.route("/").get((req,res) => {

    Product.find().then((Products) => {
        res.json(Products)
    }).catch((err) => {
        console.log(err);
    })
})

//update single item
router.route("/update/:id").put( async(req,res) => {

    let productId = req.params.id;
    const { name, quantity, description } = req.body;

    const updateProduct = {
        name, quantity, description
    }

    const update = await Product.findByIdAndUpdate(productId, updateProduct)
    .then((item) => {
        res.status(200).send({status: "product updated" , data_details: item });
    }).catch((err) => {
        console.log(err)
        res.status(500).send({status: "error updating product" ,  error: err.message});
    })

})

//delete single item
router.route("/delete/:id").delete( async(req,res) => {

    let productId = req.params.id;

    await Product.findByIdAndDelete(productId)
    .then(() => {
        res.status(200).send({status: "product deleted" });
    }).catch((err) => {
        console.log(err)
        res.status(500).send({status: "error deleting product" ,  error: err.message});
    })

})

//fetch one item
router.route("/get/:id").get( async(req,res) => {

    let productId = req.params.id;

    const product = await Product.findById(productId)
    .then((item) => {
        res.status(200).send({status: "product fetched" , data_details: item});
    }).catch((err) => {
        console.log(err)
        res.status(500).send({status: "error fetching product" ,  error: err.message});
    })

})

module.exports = router;