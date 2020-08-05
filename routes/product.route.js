const express = require('express');
const app = express();
const productRoutes = express.Router();
// Require Product model in our routes module  
let Product = require('../models/product.model');
// Defined store route  
productRoutes.route('/add').post((req, res) => {
    // const job = await Job.create(req.body);
    let product = new Product(req.body);
    product.save().then(product => {
        res.status(200).json({
            success: true,
            message: 'Product has been added successfully',
            data: product
        })
    }).catch(err => {
        res.status(400).json({
            success: false,
            message: 'Unable to save to database'
        })
    });
});
// Defined get data(index or listing) route  
productRoutes.route('/').get((req, res) => {
    Product.find((err, products) => {
        if (err) {
            console.log(err);
            res.status(404).json({
                success: false,
                message: 'No Records Found'
            })
        }
        else {
            res.status(200).json({
                success: true,
                message: `Records found - ${products.length}`,
                data: products
            })
        }
    });
});

productRoutes.route('/:id').get((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (!product)
            res.status(404).json({
                success: false,
                message: 'Record not found'
            })
        else {
            res.status(200).json({
                success: true,
                message: 'Updated Successfully',
                data: product
            })
        }
    });
});
// Defined edit route  
productRoutes.route('/edit/:id').put((req, res) => {
    const id = req.params.id;
    const product = req.body;

    let prod = Product.findById(id);

    if (!prod) {
        return res.status(404).json({
            success: false,
            message: 'Job not Found'
        })
    }

    product.ProductName = product.productName;
    product.ProductDescription = product.productDescription;
    product.ProductPrice = product.productPrice;
    prod = Product.findByIdAndUpdate(id, product, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        message: 'Job is Uodated',
        data: prod
    });
});
//  Defined update route  
productRoutes.route('/update/:id').put((req, res) => {
    Product.findById(req.params.id, (err, product) => {
        if (!product)
            res.status(404).json({
                success: false,
                message: 'Record not found'
            })
        else {
            product.productName = req.body.productName;
            product.productDescription = req.body.productDescription;
            product.productPrice = req.body.productPrice;
            product.save().then(product => {
                res.status(200).json({
                    success: true,
                    message: 'Updated Successfully'
                })
            }).catch(err => {
                res.status(400).json({
                    success: false,
                    message: 'Unable to update the database'
                })
            });
        }
    });
});
// Defined delete | remove | destroy route  
productRoutes.route('/delete/:id').delete((req, res) => {
    Product.findByIdAndRemove({ _id: req.params.id }, (err, product) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                success: false,
                message: `Error deleting product`
            })
        }

        res.status(200).json({
            success: true,
            message: 'Successfully Deleted'
        })
    });
});

module.exports = productRoutes;
