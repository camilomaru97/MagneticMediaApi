// Rutas de IronSalida  
// host + /api/ironsalida

const { Router } = require('express');
const { obtenerIronSalida, crearIronSalida, actualizarIronSalida, eliminarIronSalida, obtenerIronSalidaId } = require('../controllers/ironsalida');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const router = Router();

//Validación del JWT
router.use(validarJWT);

/**
 * @swagger
 * components:
 *      schemas:
 *          Ironsalida: 
 *              type: object
 *              properties:
 *                  fecha_salida: 
 *                      type: date
 *                      description: La fecha de salida de iron salida
 *                  fecha_devolucion: 
 *                      type: date
 *                      description: La fecha_devolucion de iron salida
 *                  destino:
 *                      type: string
 *                      description: El destino de iron salida
 *                  ubicacion:
 *                      type: string
 *                      description: La ubicacion de iron salida
 *                  numero_remision:
 *                      type: number
 *                      description: El numero_remision de iron salida
 *                  codigo_medio:
 *                      type: string
 *                      description: El codigo de iron salida
 *              required: 
 *                  - fecha_salida
 *                  - fecha_devolucion
 *                  - destino
 *                  - ubicacion
 *                  - numero_remision
 *                  - codigo_medio
 *              example: 
 *                  fecha_salida: 300000000000
 *                  fecha_devolucion: 512325232344
 *                  destino: Bogota
 *                  ubicacion: Bogota
 *                  numero_remision: 1234567891243456
 *                  codigo_medio: 12345675
 */

//Obtener ironSalida 
/**
 * @swagger
 *  /api/ironsalida:
 *      get: 
 *          summary: Retorna todos los iron salida
 *          tags: [Ironsalida]
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
 *                              $ref: '#/components/schemas/Ironsalida'
 *          responses: 
 *              200: 
 *                  description: ok
 *              500: 
 *                  description: Hable con el administrador
 */
router.get('/', obtenerIronSalida);

/**
 * @swagger
 *  /api/ironsalida/{id}:
 *      get: 
 *          summary: Retorna un iron salida
 *          tags: [Ironsalida]
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
 *                description: id iron salida  
 *          responses: 
 *              200: 
 *                  description: ok
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Ironsalida'
 *              404: 
 *                  description: iron salida not found
 */
router.get('/:id', obtenerIronSalidaId);

//Crear un nuevo ironSalida
/**
 * @swagger
 *  /api/ironsalida:
 *      post: 
 *          summary: Crear un nuevo iron salida
 *          tags: [Ironsalida]
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
 *                          $ref: '#/components/schemas/Ironsalida'
 *          responses: 
 *              200: 
 *                  description: ok
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Ironsalida'
 *              404: 
 *                  description: iron salida ya existe
 */
router.post(
    '/',
    [// middlewares
        check('fecha_salida', 'Fecha de inicio es obligatoria'),
        check('fecha_devolucion', 'Fecha de finalización es obligatoria'),
        check('destino', 'El destino es obligatorio').not().isEmpty(),
        check('ubicacion', 'La ubicacion es obligatoria').not().isEmpty(),
        check('numero_remision', 'El numero de remision es obligatorio').not().isEmpty(),
        check('numero_remision', 'El numero de remision no puede ser alfanumerico').isNumeric(),
        check('numero_remision', 'El numero de remision debe ser entre 10 y 20 numeros').isLength({ min: 10, max: 20 }),
        check('codigo_medio', 'El codigo es obligatorio').not().isEmpty(),
        check('codigo_medio', 'El codigo del medio debe de ser de 8 caracteres').isLength({ min: 8, max: 8 }),
        validarCampos
    ],
    crearIronSalida
);

//Actualizar ironSalida
/**
 * @swagger
 *  /api/ironsalida/{id}:
 *      put: 
 *          summary: Actualiza un iron salida
 *          tags: [Ironsalida]
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
 *                description: id iron salida  
 *          responses: 
 *              200: 
 *                  description: iron salida actualizado
 *              404: 
 *                  description: iron salida not found
 */
router.put(
    '/:id',
    [// middlewares
        check('fecha_salida', 'Fecha de inicio es obligatoria'),
        check('fecha_devolucion', 'Fecha de finalización es obligatoria'),
        check('destino', 'El destino es obligatorio').not().isEmpty(),
        check('ubicacion', 'La ubicacion es obligatoria').not().isEmpty(),
        check('numero_remision', 'El numero de remision es obligatorio').not().isEmpty(),
        check('numero_remision', 'El numero de remision no puede ser alfanumerico').isNumeric(),
        check('numero_remision', 'El numero de remision debe ser entre 10 y 20 numeros').isLength({ min: 10, max: 20 }),
        check('codigo_medio', 'El codigo es obligatorio').not().isEmpty(),
        check('codigo_medio', 'El codigo del medio debe de ser de 8 caracteres').isLength({ min: 8, max: 8 }),
        validarCampos
    ],
    actualizarIronSalida
);

//Borrar ironSalida
/**
 * @swagger
 *  /api/ironsalida/{id}:
 *      delete: 
 *          summary: Elimina un iron salida
 *          tags: [Ironsalida]
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
 *                description: id iron salida  
 *          responses: 
 *              200: 
 *                  description: iron salida eliminado
 *              404: 
 *                  description: iron salida not found
 */
router.delete('/:id', eliminarIronSalida);

module.exports = router;
