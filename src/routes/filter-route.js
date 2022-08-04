const { Router } = require('express');
const { filterByTypeProduct } = require('../controllers/filter-controller');

const router = Router();

router.get('/:typeProduct', filterByTypeProduct)

module.exports = router;
