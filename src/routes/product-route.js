const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, getProductById, getAllProducts, updateProduct, deleteProduct, getProductsByUser } = require('../controllers/product-controller');
const { validateFields } = require('../middlewares/validate-filelds');

const router = Router();

router.post(
	'/',
	[
		check('name', 'El nombre es obligatorio').not().isEmpty(),
		check('type', 'El tipo de cultivo no es valido!').isIn(['FRUITS', 'CEREALS', 'LEGOMINOUS', 'VEGETABLES', 'TUBERS']),
		check('harvestDate', 'No es formato de fecha válido').not().isEmpty().isDate(),
		check('harvestLocation', 'La ubicación del cultivo es obligatorio!').not().isEmpty(),
		check('units', 'Unidades de cultivo no válido').isIn(['KG', 'LB', 'AR']),
		check('quantityAvalible', 'La cantidad disponible es obligatoria!').not().isEmpty(),
		check('pricePerunit', 'El precio por unidad es obligatorio!').not().isEmpty(),
		check('image', 'La imagen es obligatoria!').not().isEmpty(),
		check('description', 'La descripción es obligatoria!').not().isEmpty(),
		validateFields,
	],
	createProduct
);

router.get('/:id', getProductById);

router.get('/', getAllProducts);

router.get('/:userId/:email', getProductsByUser);

router.put('/:id', updateProduct);

router.patch('/id', deleteProduct);

module.exports = router;
