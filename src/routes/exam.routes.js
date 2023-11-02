const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { newScore, getScores } = require('../controllers/exam');
const router = Router();

router.post('/', newScore)
router.get('/', getScores)

module.exports = router;