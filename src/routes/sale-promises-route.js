const { Router } = require('express');
const { createSalePromise, getAllSalePromises, getPromiseByUser, setStatePromise } = require('../controllers/sale-promises-controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

/**
 * @swagger
 * components:
 *  schemas:
 *   Promise:
 *    type: object
 *    properties:
 *     userSellerId:
 *      type: number
 *      description: Identificador del usuario Vendedor
 *     userBuyerId:
 *      type: number
 *      description: Identificador del usuario Comprador
 *     productId:
 *      type: number
 *      description: Identificador del producto agrícola
 *     date:
 *      type: string
 *      description: Fecha en la que se inicia la promesa de compra/venta
 *     statusSale:
 *      type: string
 *      description: Puede ser A(Activate), E(ExpirationTime), C(Canceled), S(Solved)
 *     saleQuantity:
 *      type: number
 *      description: Cantidad del producto agríola a comprar
 *     pricePerUnit:
 *      type: number
 *      description: Precio unitario del producto agrícola al momento de hacer el negocio
 *     total:
 *      type: number
 *      description: total de la compra
 *    required:
 *     - userSellerId
 *     - userBuyerId
 *     - productId
 *     - date
 *     - statusSale
 *     - saleQuantity
 *     - pricePerUnit
 *     - total
 */

/**
 * @swagger
 * /api/salePromises/{userSellerId}/{userBuyerId}/{productId}:
 *  post:
 *   summary: Crear una promesa de compra/venta
 *   tags: [Buyer/Sale Promise]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: true
 *    - in: path
 *      name: userSellerId
 *      required: true
 *      description: Identificador del usuario vendedor
 *      schema:
 *       type: string
 *    - in: path
 *      name: userBuyerId
 *      required: true
 *      description: Identificador del usuario comprador
 *      schema:
 *       type: string
 *    - in: path
 *      name: productId
 *      required: true
 *      description: Identificador del producto agrícola
 *      schema:
 *       type: string
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        date:
 *         type: string
 *         description: Fecha en la que se inicia la promesa de compra/venta
 *        statusSale:
 *         type: string
 *         description: Puede ser A(Activate), E(ExpirationTime), C(Canceled), S(Solved)
 *        saleQuantity:
 *         type: number
 *         description: Cantidad del producto agríola a comprar
 *        pricePerUnit:
 *         type: number
 *         description: Precio unitario del producto agrícola al momento de hacer el negocio
 *        total:
 *         type: number
 *         description: total de la compra
 *   responses:
 *    200:
 *     description: Promesa de compra/venta creada exitosamente!
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        $ref: '#/components/schemas/Promise'
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.post('/:userSellerId/:userBuyerId/:productId', [validateJWT], createSalePromise);


/**
 * @swagger
 * /api/salePromises/:
 *  get:
 *   summary: Obtiene una promesa de compra/venta
 *   tags: [Buyer/Sale Promise]
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
 *        propesties:
 *         success:
 *          type: number
 *          description: Indicador si los datos viajan correctamente
 *        $ref: '#/components/schemas/Promise'
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.get('/', [validateJWT], getAllSalePromises);


/**
 * @swagger
 * /api/salePromises/{userId}/{role}:
 *  get:
 *   summary: Obtiene una promesa de compra o venta dependiendo del rol
 *   tags: [Buyer/Sale Promise]
 *   parameters:
 *    - in: header
 *      name: x-token
 *      description: Debe ingresar el token en el header
 *      required: 
 *    - in: path
 *      name: userId
 *      required: true
 *      description: Identificador del usuario
 *      schema:
 *       type: number
 *    - in: path
 *      name: role
 *      required: true
 *      description: Identificador del rol del usuario [buyer, seller]
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Ok
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        propesties:
 *         success:
 *          type: number
 *          description: Indicador si los datos viajan correctamente
 *        $ref: '#/components/schemas/Promise'
 *    404:
 *     description: Datos ingresados de forma incorrecta
 */
router.get('/:userId/:role', [validateJWT], getPromiseByUser);

router.put('/:id/:newState', setStatePromise)

module.exports = router;
