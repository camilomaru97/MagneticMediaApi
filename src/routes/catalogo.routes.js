// Rutas de Catalogo / catalogo
// host + /api/catalogo

const { Router } = require('express');
const { obtenerCatalogo, crearCatalogo, actualizarCatalogo, eliminarCatalogo, obtenerCatalogolidaId } = require('../controllers/catalogo');
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
 *          Catalogo: 
 *              type: object
 *              properties:
 *                  numero_ip: 
 *                      type: string
 *                      description: El numero ip de catalogo
 *                  nombre_servidor: 
 *                      type: string
 *                      description: El nombre servidor del catalogo
 *                  nombre_catalogo:
 *                      type: string
 *                      description: El nombre del catalogo
 *                  consola:
 *                      type: string
 *                      description: consola del catalogo
 *                  ciclo:
 *                      type: string
 *                      description: ciclo del catalogo
 *                  programa:
 *                      type: string
 *                      description: programa del catalogo
 *                  tecnologia:
 *                      type: string
 *                      description: tecnologia del catalogo
 *              required: 
 *                  - numero_ip
 *                  - nombre_servidor
 *                  - nombre_catalogo
 *                  - consola
 *                  - ciclo
 *                  - programa
 *                  - tecnologia
 *              example: 
 *                  numero_ip: 123.145.124.567
 *                  nombre_servidor: servidor1234517
 *                  nombre_catalogo: ABCD113123DDVF1231
 *                  consola: Zona Franca
 *                  ciclo: Diario
 *                  programa: Dataprotector
 *                  tecnologia: LT06
 */

//Obtener catalogo 
/**
 * @swagger
 *  /api/catalogo:
 *      get: 
 *          summary: Retorna todos los catalogos
 *          tags: [Catalogo]
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
 *                              $ref: '#/components/schemas/Catalogo'
 *          responses: 
 *              200: 
 *                  description: ok
 *              500: 
 *                  description: Hable con el administrador
 */
router.get('/', (obtenerCatalogo));

/**
 * @swagger
 *  /api/catalogo/{id}:
 *      get: 
 *          summary: Retorna un catalogo
 *          tags: [Catalogo]
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
 *                description: id catalogo  
 *          responses: 
 *              200: 
 *                  description: ok
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Catalogo'
 *              404: 
 *                  description: catalogo not found
 */
router.get('/:id', (obtenerCatalogolidaId));

//Crear un nuevo catalogo
/**
 * @swagger
 *  /api/catalogo:
 *      post: 
 *          summary: Crear un nuevo catalogo
 *          tags: [Catalogo]
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
 *                          $ref: '#/components/schemas/Catalogo'
 *          responses: 
 *              200: 
 *                  description: ok
 *                  content: 
 *                      application/json:
 *                          schema: 
 *                              type: object
 *                              $ref: '#/components/schemas/Catalogo'
 *              404: 
 *                  description: catalogo ya existe
 */
router.post(
    '/',
    [// middlewares
        check('numero_ip', 'El numero de ip es obligatorio').not().isEmpty(),
        check('nombre_servidor', 'El nombre del servidor es obligatorio').not().isEmpty(),
        check('nombre_catalogo', 'El nombre del catalogo es obligatorio').not().isEmpty(),
        check('nombre_catalogo', 'El nombre del catalogo debe ser alfanumerico').not().isNumeric(),
        check('nombre_catalogo', 'El nombre del catalogo debe de ser entre 4 y 30 caracteres').isLength({ min: 4, max: 30 }),
        check('consola', 'La consola es obligatoria').not().isEmpty(),
        check('ciclo', 'El ciclo es obligatorio').not().isEmpty(),
        check('programa', 'El programa es obligatorio').not().isEmpty(),
        check('tecnologia', 'Latecnologia es obligatorio').not().isEmpty(),
        validarCampos
    ],
    crearCatalogo
);

//Actualizar catalogo
/**
 * @swagger
 *  /api/catalogo/{id}:
 *      put: 
 *          summary: Actualiza un catalogo
 *          tags: [Catalogo]
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
 *                description: id catalogo  
 *          responses: 
 *              200: 
 *                  description: catalogo actualizado
 *              404: 
 *                  description: catalogo not found
 */
router.put(
    '/:id',
    [// middlewares
        check('numero_ip', 'El numero de ip es obligatorio').not().isEmpty(),
        check('nombre_servidor', 'El nombre del servidor es obligatorio').not().isEmpty(),
        check('nombre_catalogo', 'El nombre del catalogo es obligatorio').not().isEmpty(),
        check('nombre_catalogo', 'El nombre del catalogo debe ser alfanumerico').not().isNumeric(),
        check('nombre_catalogo', 'El nombre del catalogo debe de ser entre 4 y 30 caracteres').isLength({ min: 4, max: 30 }),
        check('consola', 'La consola es obligatoria').not().isEmpty(),
        check('ciclo', 'El ciclo es obligatorio').not().isEmpty(),
        check('programa', 'El programa es obligatorio').not().isEmpty(),
        check('tecnologia', 'Latecnologia es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarCatalogo
);

//Borrar catalogo
/**
 * @swagger
 *  /api/catalogo/{id}:
 *      delete: 
 *          summary: Elimina un catalogo
 *          tags: [Catalogo]
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
 *                description: id catalogo  
 *          responses: 
 *              200: 
 *                  description: catalogo eliminado
 *              404: 
 *                  description: catalogo not found
 */
router.delete('/:id', eliminarCatalogo);

module.exports = router;