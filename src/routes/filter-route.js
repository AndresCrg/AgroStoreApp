const { Router } = require('express');
const { filterByTypeProduct, filterProductsByDateToday, filterProductsByDateWeek } = require('../controllers/filter-controller');

const router = Router();

router.get('/:typeProduct', filterByTypeProduct);

//Fecha actual, viene por el body
router.get('/', filterProductsByDateToday);

//esta semana
router.get('/:startWeek/:endWeek', filterProductsByDateWeek);

//unidades

//eliminar productos

//estandarizar nombres -bd

module.exports = router;
