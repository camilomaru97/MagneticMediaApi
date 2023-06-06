// Rutas de Usuario / Auth
// host + /api/auth

const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken, confirmarCuenta } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Usuario: 
 *              type: object
 *              properties:
 *                  name: 
 *                      type: string
 *                      description: El nombre de usuario
 *                  email: 
 *                      type: string
 *                      description: El correo del usuario
 *                  password:
 *                      type: password
 *                      description: Contraseña del usuario
 *              required: 
 *                  - name
 *                  - email
 *                  - password
 *              example: 
 *                  name: Miguel Duran
 *                  email: miguelduran@ucatolica.edu.co
 *                  password: Miguelduran@2023
 */



/**
 * @swagger
 *  /api/auth/new:
 *      post: 
 *          summary: Crea un nuevo usuario
 *          tags: [Usuario]
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/Usuario'
 *          responses: 
 *              200: 
 *                  description: El usuario fue creado con exito
 *              500: 
 *                  description: Hable con el administrador
 */
router.post(
    '/new',
    [ // middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('name', 'El nombre debe de ser de al menos 4 caracteres').isLength({ min: 4, max: 20 }),
        check('name', 'El nombre de usuario no puede ser numerico').not().isNumeric(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 8 }),
        check('password', 'El password debe contener una mayuscula, un numero y un caracter especial como (!@#$%^&*)').matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()])/),
        validarCampos
    ],
    crearUsuario
)

/**
 * @swagger
 *  /api/auth/:
 *      post: 
 *          summary: Login de un usuario
 *          tags: [Usuario]
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/Usuario'
 *          responses: 
 *              200: 
 *                  description: El usuario se autentico exitosamente
 *              400: 
 *                  description: El usuario no existe con ese email
 *              500: 
 *                  description: Hable con el administrador
 */
router.post('/', loginUsuario)

/**
 * @swagger
 *  /api/auth/renew:
 *      get: 
 *          summary: Revalidacion del token
 *          tags: [Usuario]
 *          requestBody: 
 *              required: true
 *              content: 
 *                  application/json:
 *                      schema: 
 *                          type: object
 *                          $ref: '#/components/schemas/Usuario'
 *          responses: 
 *              200: 
 *                  description: El token se ha renovado
 *              400: 
 *                  description: El usuario no existe con ese email
 *              500: 
 *                  description: Hable con el administrador
 */
router.get('/renew', revalidarToken)

/**
 * @swagger
 *  /api/auth/confirm/{token}:
 *      get: 
 *          summary: Confirmacion del usuario via email
 *          tags: [Usuario]
 *          parameters: 
 *              - in: path
 *                name: token
 *                schema:
 *                  type: string
 *                required: true
 *                description: Token del usuario  
 *          responses: 
 *              200: 
 *                  description: La cuenta ha sido confirmada con exito
 *              400: 
 *                  description: Confirmacion de cuenta no valida
 *              500: 
 *                  description: Hable con el administrador
 */
router.get('/confirm/:token', confirmarCuenta)


module.exports = router;