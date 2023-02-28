var express = require('express');
var router = express.Router();
var productController = require("../controllers/productController");

router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.get('/search/:query', productController.findProducts);
router.get('/:id', productController.getProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;