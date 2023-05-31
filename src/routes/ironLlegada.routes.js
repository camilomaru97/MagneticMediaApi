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

//Obtener ironLlegada 
router.get('/', obtenerIronLlegada);
router.get('/:id', obtenerIronLlegadaById);

//Crear un nuevo ironLlegada
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
router.delete('/:id', eliminarIronLlegada);


module.exports = router;
