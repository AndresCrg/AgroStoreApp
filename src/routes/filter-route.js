const { Router } = require('express');
const { filterByTypeProduct, filterProductsByDateToday, filterProductsByDateWeek } = require('../controllers/filter-controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:typeProduct', [validateJWT], filterByTypeProduct);

//Fecha actual, viene por el body
router.get('/',[validateJWT], filterProductsByDateToday);

//esta semana
router.get('/:startWeek/:endWeek',[validateJWT],filterProductsByDateWeek);

//unidades

//eliminar productos

//estandarizar nombres -bd

module.exports = router;
