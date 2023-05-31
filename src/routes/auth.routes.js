// Rutas de Usuario / Auth
// host + /api/auth

const { Router } = require('express');
const { crearUsuario, loginUsuario, revalidarToken, confirmarCuenta } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { check } = require('express-validator');
const router = Router();

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
router.post('/', loginUsuario)

router.get('/renew', revalidarToken)

router.get('/confirm/:token', confirmarCuenta)


module.exports = router;