const { Router } = require('express');
const { filterByTypeProduct, filterByHarvestDate, filterByHarvestLocation } = require('../controllers/filter-controller');

const router = Router();

router.get('/:typeProduct', filterByTypeProduct);

router.get('/:harvestDate', filterByHarvestDate);

router.get('/:harvestLocation', filterByHarvestLocation);

module.exports = router;
