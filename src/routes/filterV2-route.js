const { Router } = require('express');
const { filterByPriceRange, filterByUnits } = require('../controllers/filterV2-controller');

const router = Router();

router.get('/:lowerPrice/:higherPrice', filterByPriceRange);

router.get('/:units', filterByUnits);

module.exports = router;
