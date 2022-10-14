const {Router}= require('express');
const { check } = require('express-validator');

const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost } = require('../controllers/usuarios');
const { RoleValidator, emailValidator,idValidator } = require('../helpers/db-validators');

const {validarCampos}=require('../middleware/validar-campos');
const { validarJWT } = require('../middleware/validar-jwt');

const router = Router()

router.get("/usuarios", usuariosGet)

router.put("/:id",[
    check('id', 'No es in ID valido').isMongoId(),
    check('id').custom(idValidator),
    check('rol').custom(RoleValidator),
    validarCampos
], usuariosPut )

router.delete("/:id", [
    validarJWT,
    check('id', 'No es in ID valido').isMongoId(),
    check('id').custom(idValidator),
    validarCampos
],usuariosDelete);

router.post("/",[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'La contraseña debe tener 6 caracteres').isLength({min:6}),
    check('correo', 'Esto no es un correo').isEmail(),
    check('correo').custom(emailValidator),
    // check('rol', 'No es un rol valido').isIn(['Admin', 'USer']),
    check('rol').custom(RoleValidator),
    validarCampos
], usuariosPost);

module.exports= router