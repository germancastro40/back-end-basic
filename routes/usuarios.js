const {Router}= require('express');
const { usuariosGet, usuariosDelete, usuariosPut, usuariosPost } = require('../controllers/usuarios');
const router = Router()

router.get("/usuario", usuariosGet)

router.put("/:id", usuariosPut)

router.delete("/", usuariosDelete);

router.post("/", usuariosPost);

module.exports= router