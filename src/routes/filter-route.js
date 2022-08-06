const { Router } = require('express');
const { filterByTypeProduct, filterByHarvestDate, filterProductsByDateToday } = require('../controllers/filter-controller');

const router = Router();

router.get('/:typeProduct', filterByTypeProduct);

router.get('/:today', filterProductsByDateToday);

router.get('/:harvestDate/:2', filterByHarvestDate);
//dia actual
//esta semana

//rango de precios

//unidades

//eliminar productos

module.exports = router;
