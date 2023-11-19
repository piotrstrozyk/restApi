const bodyParser = require('body-parser');
const express = require('express');
const Product = require('../db/conn');
const router = express.Router();
require('dotenv').config();

router.use(bodyParser.json());

//7 => raport
router.get('/products/report', async (req, res) => {
    try {
        const report = await Product.aggregate([
            {   
                $group: {
                  // Each `_id` must be unique, so if there are multiple
                  // documents with the same age, MongoDB will increment `count`.
                  _id: "$name",
                  amount: {"$first": "$amount"},
                  totalValue: { $sum: { $multiply: ["$price", "$amount"]}}
                }
              },]);
        res.json(report)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})


//3.
//  /products?sort=<query>
router.get('/products', async (req, res) => {
    try {
        if (req.query.sort) {  
            const data1 = await Product.find().sort({ [req.query.sort]: 1 });
            res.json(data1)
        }
        else if (req.query) {
            const data2 = await Product.find(req.query);
            res.json(data2)
        }
        else {
            const all = await Product.find();
            res.json(all)
        }
    }
    catch (error) {
        res.status(500).json({ message: "Error" })
    }
})


//4
router.post('/products', async (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        amount: req.body.amount,
        measure: req.body.measure
    });
    const dbArray = await Product.find()
    const searchProdName = dbArray.some(prod => prod.name === product.name)
    try {
        if (searchProdName === false) {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
        } else {
            res.status(400).json({message: "Product already exists"})
        }
    } catch (err) {
        res.status(400).json({message: err.message});
    }
})

//5
router.get('/products/:id', async (req, res) => {
    try {
    const search = await Product.findById(req.params.id)
    res.json(search)
    }
    catch (err) {
        res.status(500).json({message: err.message})
    }
  })

router.put('/products/:id', async (req, res) => {
    try {
        const update = await Product.findByIdAndUpdate(
            req.params.id, req.body, { new: true }
        )
        res.send(update);
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//6
router.delete('/products/:id',  async (req, res) => {
    try {
        const update = await Product.findByIdAndDelete(req.params.id)
        res.send("Product deleted")
    }
        catch (error) {
            res.status(400).json({ message: error.message })
        }
  })

module.exports = router;
