const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-filelds');
const { getUserById, createUser, getUsers, updateUser } = require('../controllers/user-controller');
const { documentExist, emailExist, documentExistById } = require('../middlewares/validate-db');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post(
	'/',
	[
		check('full_name', 'El nombre es obligatorio!').not().isEmpty(),
		check('document_type', 'No es un tipo de documento valido!').not().isEmpty().isIn(['CC', 'CE', 'PA']),
		check('document', 'El documento es obligatorio!').not().isEmpty().custom(documentExist),
		check('address', 'La dirección de residencia es obligatorio!').not().isEmpty(),
		check('city', 'La ciudad es obligatoria!').not().isEmpty(),
		check('phone_number', 'El número celular es obligatorio!').not().isEmpty(),
		check('credentialId', 'El email es obligatorio').not().isEmpty().isEmail().custom(emailExist),
		check('password', 'La contraseña es obligatorio').not().isEmpty(),
		validateFields,
	],
	createUser
);

router.get('/:id', [validateJWT, check('id').custom(documentExistById), validateFields], getUserById);

router.get('/', getUsers);

router.put('/:id', [validateJWT, check('document').custom(documentExistById), validateFields], updateUser);

module.exports = router;
