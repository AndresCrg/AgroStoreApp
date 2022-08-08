const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth-controller');
const { emailDoesNotRegistry } = require('../middlewares/validate-db');
const { validateFields } = require('../middlewares/validate-filelds');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Credential:
 *    type: object
 *    properties:
 *     email:
 *      type: string
 *      description: Email of user. PK of table Crendential
 *     password:
 *      type: string
 *      description: Password of the account of the user
 *    required:
 *     - email
 *     - password
 */

/**
 * @swagger
 * /api/auth:
 *  post:
 *   summary: Login usuario
 *   tags: [Credentials]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Credential'
 *   responses:
 *    200:
 *     description: Ok
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         document:
 *          type: string
 *          description: Documento del usuario
 *         token:
 *          type: string
 *          description: Token generado para el manejo de sesión
 *         role:
 *          type: string
 *          description: Role del usuario (Admin o  user)
 *    404:
 *     description: Usuario o contraseña incorrectos
 */

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
