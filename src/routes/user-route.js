const { Router } = require('express');
const { check } = require('express-validator');

const { validateFields } = require('../middlewares/validate-filelds');
const { getUserById, createUser, getUsers, updateUser } = require('../controllers/user-controller');
const { documentExist, emailExist, documentExistById } = require('../middlewares/validate-db');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *     full_name:
 *      type: string
 *      description: The full name of user
 *     document_type:
 *      type: string
 *      description: Can be CC, CE, PA
 *     document:
 *      type: string
 *      description: Document of user
 *     address:
 *      type: string
 *      description: residence address of user
 *     city:
 *      type: string
 *      description: City where reside the user
 *     phone_number:
 *      type: string
 *      description: Phone number of the user
 *     email:
 *      type: string
 *      description: Email of user. PK of table Crendential
 *     password:
 *      type: string
 *      description: Password of the account of the user
 *    required:
 *     - full_name
 *     - document_type
 *     - document
 *     - address
 *     - city
 *     - phone_number
 *     - email
 *     - password
 */

/**
 * @swagger
 * /api/users:
 *  post:
 *   summary: Crear nuevo usuario
 *   tags: [Users]
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *     description: Usuario creado exitosamente!
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
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

/**
 * @swagger
 * /api/users/{id}:
 *  get:
 *   summary: Obtener usuario por documento
 *   tags: [Users]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: id
 *      required: true
 *      description: Documento del usuario
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: datos del usuario
 *    401:
 *     description: No se encontró token válido
 *    404:
 *     description: Datos ingresados de forma incorrecta
 *
 */
router.get('/:id', [validateJWT, check('id').custom(documentExistById), validateFields], getUserById);

/**
 * @swagger
 * /api/users/:
 *  get:
 *   summary: Obtener todos los usuarios - admin
 *   tags: [Users]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *   responses:
 *    200:
 *     description: datos del usuario
 *    401:
 *     description: No se encontró token válido
 *    404:
 *     description: Datos ingresados de forma incorrecta
 *
 */
router.get('/', [validateJWT], getUsers);

/**
 * @swagger
 * /api/users/{id}:
 *  put:
 *   summary: Actualizar usuario
 *   tags: [Users]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: id
 *      required: true
 *      description: Documento del usuario
 *      schema:
 *       type: string
 *   requestBody:
 *    required: false
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/User'
 *   responses:
 *    200:
 *     description: Empleado actualizado exitosamente!
 *    401:
 *     description: No se encontró token válido
 *    404:
 *     description: Datos ingresados de forma incorrecta
 *
 */
router.put('/:id', [validateJWT, check('document').custom(documentExistById), validateFields], updateUser);

module.exports = router;
