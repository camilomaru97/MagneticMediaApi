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

//Obtener ironSalida 
router.get('/', obtenerIronSalida);
router.get('/:id', obtenerIronSalidaId);

//Crear un nuevo ironSalida
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
router.delete('/:id', eliminarIronSalida);

module.exports = router;
