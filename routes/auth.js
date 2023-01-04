const { Router } = require('express');
const { check } = require('express-validator');
const { getFiles } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/'
//,[
    //middlewares,
    //validarCampos
//]
, getFiles);

module.exports = router;