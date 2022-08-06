const { Router } = require('express');
const { filterByTypeProduct, filterProductsByDateToday } = require('../controllers/filter-controller');

const router = Router();

router.get('/:typeProduct', filterByTypeProduct);

router.get('/', filterProductsByDateToday);

//dia actual
//esta semana

//rango de precios

//unidades

//eliminar productos

module.exports = router;
