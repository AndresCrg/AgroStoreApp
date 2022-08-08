const { Router } = require('express');
const { filterByPriceRange, filterByUnits } = require('../controllers/filterV2-controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:lowerPrice/:higherPrice', [validateJWT], filterByPriceRange);

router.get('/:units', [validateJWT], filterByUnits);

module.exports = router;
