const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth-controller');
const { emailDoesNotRegistry } = require('../middlewares/validate-db');
const { validateFields } = require('../middlewares/validate-filelds');

const router = Router();

router.post(
	'/',
	[
		check('email', 'El campo del email es obligatorio!').not().isEmpty(),
		check('email', 'No es un formato de email válido').isEmail(),
		check('email').custom(emailDoesNotRegistry),
		check('password', 'El campo del password es obligatorio!').not().isEmpty(),
		validateFields,
	],
	login
);

module.exports = router;
