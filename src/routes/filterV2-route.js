const { Router } = require('express');
const { filterByPriceRange } = require('../controllers/filterV2-controller');

const router = Router();

router.get('/:lowerPrice/:higherPrice', filterByPriceRange);

module.exports = router;
