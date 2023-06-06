// Rutas de IronLlegada 
// host + /api/ironllegada

const { Router } = require('express');
const { obtenerIronLlegada, crearIronLlegada, actualizarIronLlegada, eliminarIronLlegada, obtenerIronLlegadaById } = require('../controllers/ironllegada');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { isDate } = require('moment');
const { check } = require('express-validator');

const router = Router();

//Validación del JWT
router.use(validarJWT);

/**
 * @swagger
 * components:
 *      schemas:
 *          Ironllegada: 
 *              type: object
 *              properties:
 *                  tipo_transporte: 
 *                      type: date
 *                      description: El tipo de transporte de iron llegada
 *                  destino: 
 *                      type: date
 *                      description: El destino de iron llegada
 *                  ubicacion:
 *                      type: string
 *                      description: La ubicacion de iron llegada
 *                  numero_remision:
 *                      type: string
 *                      description: El numero remision de iron llegada
 *                  codigo_medio:
 *                      type: number
 *                      description: El codigo del medio de iron llegada
 *              required: 
 *                  - tipo_transporte
 *                  - destino
 *                  - ubicacion
 *                  - numero_remision
 *                  - codigo_medio
 *              example: 
 *                  tipo_transporte: 3774
 *                  destino: Bogota
 *                  ubicacion: Calle 59
 *                  numero_remision: 31276545011232439651
 *                  codigo_medio: 123ABC45
 */

//Obtener ironLlegada 
/**
 * @swagger
 *  /api/ironllegada:
 *      get: 
 *          summary: Retorna todos los iron llegada
 *          tags: [Ironllegada]
 *          parameters: 
 *              - in: token
 *                name: token
 *                required: true
 *                description: token usuario
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/Ironllegada'
 *          responses: 
 *              200: 
 *                  description: ok
 *              500: 
 *                  description: Hable con el administrador
 */
router.get('/', obtenerIronLlegada);

/**
 * @swagger
 *  /api/ironllegada/{id}:
 *      get: 
 *          summary: Retorna un iron llegada
 *          tags: [Ironllegada]
 *          parameters: 
 *              - in: token
 *                name: token
 *                required: true
 *                description: token usuario
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id iron llegada  
 *          responses: 
 *              200: 
 *                  description: ok
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Ironllegada'
 *              404: 
 *                  description: iron llegada not found
 */
router.get('/:id', obtenerIronLlegadaById);

//Crear un nuevo ironLlegada
/**
 * @swagger
 *  /api/ironllegada:
 *      post: 
 *          summary: Crear un nuevo iron llegada
 *          tags: [Ironllegada]
 *          parameters: 
 *              - in: token
 *                name: token
 *                required: true
 *                description: token usuario
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/Ironllegada'
 *          responses: 
 *              200: 
 *                  description: ok
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Ironllegada'
 *              404: 
 *                  description: iron lleagda ya existe
 */
router.post(
    '/',
    [// middlewares
        check('destino', 'El destino es obligatorio').not().isEmpty(),
        check('ubicacion', 'La ubicacion es obligatorio').not().isEmpty(),
        check('tipo_transporte', 'El tipo_transporte es obligatorio').not().isEmpty(),
        check('numero_remision', 'El numero de remision es obligatorio').not().isEmpty(),
        check('numero_remision', 'El numero de remision no puede ser alfanumerico').isNumeric(),
        check('numero_remision', 'El numero de remision debe ser entre 10 y 20 numeros').isLength({ min: 10, max: 20 }),
        check('codigo_medio', 'El codigo del medio debe de ser de 8 caracteres').isLength({ min: 8, max: 8 }),
        check('codigo_medio', 'El codigo_medio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearIronLlegada
);

//Actualizar ironLlegada
/**
 * @swagger
 *  /api/ironllegada/{id}:
 *      put: 
 *          summary: Actualiza un iron llegada
 *          tags: [Ironllegada]
 *          parameters: 
 *              - in: token
 *                name: token
 *                required: true
 *                description: token usuario
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id iron llegada  
 *          responses: 
 *              200: 
 *                  description: iron llegada actualizado
 *              404: 
 *                  description: iron llegada not found
 */
router.put(
    '/:id',
    [// middlewares
        check('destino', 'El destino es obligatorio').not().isEmpty(),
        check('ubicacion', 'La ubicacion es obligatorio').not().isEmpty(),
        check('tipo_transporte', 'El tipo_transporte es obligatorio').not().isEmpty(),
        check('numero_remision', 'El numero de remision es obligatorio').not().isEmpty(),
        check('numero_remision', 'El numero de remision no puede ser alfanumerico').isNumeric(),
        check('numero_remision', 'El numero de remision debe ser entre 10 y 20 numeros').isLength({ min: 10, max: 20 }),
        check('codigo_medio', 'El codigo del medio debe de ser de 8 caracteres').isLength({ min: 8, max: 8 }),
        check('codigo_medio', 'El codigo_medio es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarIronLlegada
);

//Borrar ironLlegada
/**
 * @swagger
 *  /api/ironllegada/{id}:
 *      delete: 
 *          summary: Elimina un iron llegada
 *          tags: [Ironllegada]
 *          parameters: 
 *              - in: token
 *                name: token
 *                required: true
 *                description: token usuario
 *              - in: path
 *                name: id
 *                schema:
 *                  type: string
 *                required: true
 *                description: id iron llegada  
 *          responses: 
 *              200: 
 *                  description: iron llegada eliminado
 *              404: 
 *                  description: iron llegada not found
 */
router.delete('/:id', eliminarIronLlegada);


module.exports = router;
