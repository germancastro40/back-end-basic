const { response, request } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { emailValidator } = require("../helpers/db-validators");
const usuario = require("../models/usuario");

//controller para mostrar usuario
const usuariosGet = async (req = request, res = response) => {
  
  const {limite= 5, desde= 0}= req.query

  const [total, usuarios]= await Promise.all([
    Usuario.countDocuments({estado: true}),
    Usuario.find({estado: true})
      .skip(Number(desde))  
      .limit(Number(limite))

  ])


  res.json({
    total,
    usuarios
  });
};
//controller para editar un usuario
const usuariosPut = async (req, res) => {
  const { id } = req.params;
  const { password, google, correo, ...resto } = req.body;

  try {
    if (password) {
      //encriptar password
      const salt = bcryptjs.genSaltSync();
      resto.password = bcryptjs.hashSync(password, salt);
    }
    // console.log(resto);
    const updateUSer = await Usuario.findByIdAndUpdate(id, resto);

    res.json(updateUSer);
  } catch (error) {
    console.log(error);
  }
};

//controller para eliminar usuario
const usuariosDelete = async(req, res) => {
  const {id}= req.params

  //borrarlo fiscamente de la bd
  // const usuarioDelete= await Usuario.findByIdAndDelete(id)

  const usuarioDelete= await Usuario.findByIdAndUpdate(id, {estado: false})
  
  res.json(usuarioDelete)
};
//validar en la bd

//controller para crear usuario
const usuariosPost = async (req, res) => {
  const { _id, nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en base de datos
  await usuario.save();

  res.json({
    usuario
  });
};

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosDelete,
  usuariosPost,
};
