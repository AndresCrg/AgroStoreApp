const { Router } = require('express');
const { createSalePromise, getAllSalePromises, getSalePromiseByUser } = require('../controllers/sale-promises-controller');

const router = Router();

router.post('/:userSellerId/:userBuyerId/:productId', createSalePromise);

router.get('/', getAllSalePromises);

router.get('/:userId', getSalePromiseByUser);

module.exports = router;
