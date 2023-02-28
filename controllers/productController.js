var { Product } = require('../models');

exports.createProduct = async (req, res) => {
    try {
        let product = await Product.create({
            barcode: req.body.barcode,
            name: req.body.name,
            price: req.body.price
        });
        res.status(201).json({ status: "success", product });
    } catch (err) {
        res.status(409).json({ status: "failed", err });
    }
}

exports.getProducts = async (req, res) => {
    try {
        let products = await Product.findAll({ attributes: ['barcode', 'name', 'price'] });
        res.status(200).json({ status: "success", products });
    } catch (err) {
        res.status(400).json({ status: "failed", err });
    }
}

exports.findProducts = async (req, res) => {
    let query = req.params.query;
    try {
        const Op = require('sequelize').Op;
        let products = await Product.findAll({
            where: {
                [Op.or]: {
                    barcode: { [Op.like]: query },
                    name: { [Op.like]: '%' + query + '%' }
                }
            },
            attributes: ['barcode', 'name', 'price']
        });
        res.status(200).json({ status: "success", products });
    } catch (err) {
        console.log(err);
        res.status(400).json({ status: "failed", err });
    }
}

exports.getProduct = async (req, res) => {
    try {
        let barcode = req.params.id;
        let product = await Product.findOne({ where: { barcode: barcode } });
        if (product === null) {
            throw { errors: { message: "product doesn't exist." } };
        }
        res.status(200).json({ status: "success", product });
    } catch (err) {
        res.status(400).json({ status: "failed", err });
    }
}

exports.updateProduct = async (req, res) => {
    try {
        let barcode = req.params.id;
        let result = await Product.update(
            { name: req.body.name, price: req.body.price },
            { where: { barcode: barcode } }
        );
        if (result['0'] === 0) {
            throw { errors: { message: "operation failed." } };
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ status: "failed", err });
    }
}

exports.deleteProduct = async (req, res) => {
    try {
        let barcode = req.params.id;
        let result = await Product.destroy({ where: { barcode: barcode } });
        if (result === 0) {
            throw { errors: { message: "operation failed." } };
        }
        res.sendStatus(204);
    } catch (err) {
        res.status(400).json({ status: "failed", err });
    }
}
