const { Router } = require('express');
const { createSalePromise } = require('../controllers/sale-promises-controller');

const router = Router();

router.get('/:userSellerId/:userBuyerId/:productId', createSalePromise);

module.exports = router;
