const { Router } = require('express');
const { createSalePromise, getAllSalePromises, getPromiseByUser } = require('../controllers/sale-promises-controller');

const router = Router();

router.post('/:userSellerId/:userBuyerId/:productId', createSalePromise);

router.get('/', getAllSalePromises);

router.get('/:userId/:role', getPromiseByUser);

module.exports = router;
