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

//Obtener eventos 
router.get('/', (obtenerCatalogo));
router.get('/:id', (obtenerCatalogolidaId));

//Crear un nuevo evento
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

//Actualizar Evento
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

//Borrar evento
router.delete('/:id', eliminarCatalogo);

module.exports = router;