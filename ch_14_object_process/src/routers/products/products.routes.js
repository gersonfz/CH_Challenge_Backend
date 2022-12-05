const express = require('express');
const productsController = require('../../controller/products.controller')
const auth = require('../../middleware/auth.middleware');

const router = express.Router();
router.get('/', productsController.getProducts);
router.get('/:id', productsController.getProductById);
router.post('/', auth, productsController.saveProduct);
router.put('/:id', auth, productsController.updateProduct);
router.delete('/:id', auth, productsController.deleteProductById);
router.post('/products-test', auth, );

module.exports = router;