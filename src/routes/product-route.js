const { Router } = require('express');
const { check } = require('express-validator');
const {
	createProduct,
	getProductById,
	getAllProducts,
	updateProduct,
	deleteProduct,
	getProductsByUser,
	getProductsToBuy,
} = require('../controllers/product-controller');
const { validateFields } = require('../middlewares/validate-filelds');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Product:
 *    type: object
 *    properties:
 *     name:
 *      type: string
 *      description: Nombre del producto agícola
 *     type:
 *      type: string
 *      description: Puede ser FRUITS, VEGETABLES, CEREALS, LEGOMINOUS, TUBERS
 *     harvestDate:
 *      type: string
 *      description: Fecha de cosecha del producto agrícola
 *     harverstLocation:
 *      type: string
 *      description: Ubicación donde se cosechó el producto agrícola
 *     units:
 *      type: string
 *      description: Puede ser KG(Kilogramos), LB(Libras), AR(Arrobas)
 *     quantityAvalible:
 *      type: number
 *      description: Cantidad del producto agríola disponible para la venta
 *     pricePerunit:
 *      type: number
 *      description: Precio unitario del producto agrícola
 *     image:
 *      type: string
 *      description: ruta de la imagen del producto agrícola
 *     description:
 *      type: string
 *      description: Breve descripción del producto agrícola
 *     state:
 *      type: string
 *      description: estado del producto agrícola
 *    required:
 *     - name
 *     - type
 *     - harvestDate
 *     - harvestLocation
 *     - units
 *     - quantityAvalible
 *     - pricePerunit
 *     - image
 *     - description
 *     - userId
 */

/**
 * @swagger
 * /api/products/{userId}:
 *  post:
 *   summary: Crear nuevo producto
 *   tags: [Products]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: userId
 *      required: true
 *      description: Documento del usuario
 *      schema:
 *       type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       $ref: '#/components/schemas/Product'
 *   responses:
 *    200:
 *     description: Producto creado exitosamente!
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *          description: Nombre del producto agícola
 *         type:
 *          type: string
 *          description: Puede ser FRUITS, VEGETABLES, CEREALS, LEGOMINOUS, TUBERS
 *         harvestDate:
 *          type: string
 *          description: Fecha de cosecha del producto agrícola
 *         harverstLocation:
 *          type: string
 *          description: Ubicación donde se cosechó el producto agrícola
 *         units:
 *          type: string
 *          description: Puede ser KG(Kilogramos), LB(Libras), AR(Arrobas)
 *         quantityAvalible:
 *          type: number
 *          description: Cantidad del producto agríola disponible para la venta
 *         pricePerunit:
 *          type: number
 *          description: Precio unitario del producto agrícola
 *         image:
 *          type: string
 *          description: ruta de la imagen del producto agrícola
 *         description:
 *          type: string
 *          description: Breve descripción del producto agrícola
 *         state:
 *          type: string
 *          description: estado del producto agrícola
 *         userId:
 *          type: number
 *          description: id del usuario que creó el producto agrícola
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.post(
	'/:userId',
	[
		validateJWT,
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

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *   summary: Obtener producto por id
 *   tags: [Products]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: id
 *      required: true
 *      description: Identificador único del producto
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Ok
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *          description: Nombre del producto agícola
 *         type:
 *          type: string
 *          description: Puede ser FRUITS, VEGETABLES, CEREALS, LEGOMINOUS, TUBERS
 *         harvestDate:
 *          type: string
 *          description: Fecha de cosecha del producto agrícola
 *         harverstLocation:
 *          type: string
 *          description: Ubicación donde se cosechó el producto agrícola
 *         units:
 *          type: string
 *          description: Puede ser KG(Kilogramos), LB(Libras), AR(Arrobas)
 *         quantityAvalible:
 *          type: number
 *          description: Cantidad del producto agríola disponible para la venta
 *         pricePerunit:
 *          type: number
 *          description: Precio unitario del producto agrícola
 *         image:
 *          type: string
 *          description: ruta de la imagen del producto agrícola
 *         description:
 *          type: string
 *          description: Breve descripción del producto agrícola
 *         state:
 *          type: string
 *          description: estado del producto agrícola
 *         userId:
 *          type: number
 *          description: id del usuario que creó el producto agrícola
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.get('/:id', [validateJWT], getProductById);

/**
 * @swagger
 * /api/products/:
 *  get:
 *   summary: Obtiene todos los productos activos
 *   tags: [Products]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *   responses:
 *    200:
 *     description: Ok
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *          description: Nombre del producto agícola
 *         type:
 *          type: string
 *          description: Puede ser FRUITS, VEGETABLES, CEREALS, LEGOMINOUS, TUBERS
 *         harvestDate:
 *          type: string
 *          description: Fecha de cosecha del producto agrícola
 *         harverstLocation:
 *          type: string
 *          description: Ubicación donde se cosechó el producto agrícola
 *         units:
 *          type: string
 *          description: Puede ser KG(Kilogramos), LB(Libras), AR(Arrobas)
 *         quantityAvalible:
 *          type: number
 *          description: Cantidad del producto agríola disponible para la venta
 *         pricePerunit:
 *          type: number
 *          description: Precio unitario del producto agrícola
 *         image:
 *          type: string
 *          description: ruta de la imagen del producto agrícola
 *         description:
 *          type: string
 *          description: Breve descripción del producto agrícola
 *         state:
 *          type: string
 *          description: estado del producto agrícola
 *         userId:
 *          type: number
 *          description: id del usuario que creó el producto agrícola
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.get('/', [validateJWT], getAllProducts);

/**
 * @swagger
 * /api/products/getUsersProduct/{userId}:
 *  get:
 *   summary: Obtener todos los productos por usuario
 *   tags: [Products]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: userId
 *      required: true
 *      description: Identificador único del usuario
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Ok
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *          description: Nombre del producto agícola
 *         type:
 *          type: string
 *          description: Puede ser FRUITS, VEGETABLES, CEREALS, LEGOMINOUS, TUBERS
 *         harvestDate:
 *          type: string
 *          description: Fecha de cosecha del producto agrícola
 *         harverstLocation:
 *          type: string
 *          description: Ubicación donde se cosechó el producto agrícola
 *         units:
 *          type: string
 *          description: Puede ser KG(Kilogramos), LB(Libras), AR(Arrobas)
 *         quantityAvalible:
 *          type: number
 *          description: Cantidad del producto agríola disponible para la venta
 *         pricePerunit:
 *          type: number
 *          description: Precio unitario del producto agrícola
 *         image:
 *          type: string
 *          description: ruta de la imagen del producto agrícola
 *         description:
 *          type: string
 *          description: Breve descripción del producto agrícola
 *         state:
 *          type: string
 *          description: estado del producto agrícola
 *         userId:
 *          type: number
 *          description: id del usuario que creó el producto agrícola
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.get('/getUsersProduct/:userId', [validateJWT], getProductsByUser);

router.get('/getProductsToBuy/:userId', [validateJWT], getProductsToBuy);

/**
 * @swagger
 * /api/products/{id}:
 *  put:
 *   summary: Actualizar un producto
 *   tags: [Products]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: id
 *      required: true
 *      description: Identificador único del producto
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Producto actualizado exitosamente!
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *          description: Nombre del producto agícola
 *         type:
 *          type: string
 *          description: Puede ser FRUITS, VEGETABLES, CEREALS, LEGOMINOUS, TUBERS
 *         harvestDate:
 *          type: string
 *          description: Fecha de cosecha del producto agrícola
 *         harverstLocation:
 *          type: string
 *          description: Ubicación donde se cosechó el producto agrícola
 *         units:
 *          type: string
 *          description: Puede ser KG(Kilogramos), LB(Libras), AR(Arrobas)
 *         quantityAvalible:
 *          type: number
 *          description: Cantidad del producto agríola disponible para la venta
 *         pricePerunit:
 *          type: number
 *          description: Precio unitario del producto agrícola
 *         image:
 *          type: string
 *          description: ruta de la imagen del producto agrícola
 *         description:
 *          type: string
 *          description: Breve descripción del producto agrícola
 *         state:
 *          type: string
 *          description: estado del producto agrícola
 *         userId:
 *          type: number
 *          description: id del usuario que creó el producto agrícola
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.put('/:id', [validateJWT], updateProduct);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *   summary: Eliminar un producto
 *   tags: [Products]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: id
 *      required: true
 *      description: Identificador único del producto
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Producto eliminado exitosamente!
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         name:
 *          type: string
 *          description: Nombre del producto agícola
 *         type:
 *          type: string
 *          description: Puede ser FRUITS, VEGETABLES, CEREALS, LEGOMINOUS, TUBERS
 *         harvestDate:
 *          type: string
 *          description: Fecha de cosecha del producto agrícola
 *         harverstLocation:
 *          type: string
 *          description: Ubicación donde se cosechó el producto agrícola
 *         units:
 *          type: string
 *          description: Puede ser KG(Kilogramos), LB(Libras), AR(Arrobas)
 *         quantityAvalible:
 *          type: number
 *          description: Cantidad del producto agríola disponible para la venta
 *         pricePerunit:
 *          type: number
 *          description: Precio unitario del producto agrícola
 *         image:
 *          type: string
 *          description: ruta de la imagen del producto agrícola
 *         description:
 *          type: string
 *          description: Breve descripción del producto agrícola
 *         state:
 *          type: string
 *          description: estado del producto agrícola
 *         userId:
 *          type: number
 *          description: id del usuario que creó el producto agrícola
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.patch('/:id', [validateJWT], deleteProduct);

module.exports = router;
