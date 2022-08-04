const { Router } = require('express');
const { createProduct } = require('../controllers/product-controller');

const router = Router();

router.post('/', createProduct);

module.exports = router;
