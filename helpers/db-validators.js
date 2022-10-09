const role = require("../models/role");
const Usuario = require("../models/usuario");

const RoleValidator = async (rol = "") => {
  const existeRol = await role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol '${rol}', no existe`);
  }
};

const emailValidator = async (correo='') => {

  const existeEmail = await Usuario.findOne({ correo });
  if (existeEmail) {
    throw new Error(`El correo '${correo}' ya se encuentra registrado`);
  }
};

const idValidator = async (id='') => {

  const existeId = await Usuario.findById( id );
  if (!existeId) {
    throw new Error(`El id: '${id}' no existe`);
  }
};


module.exports = { RoleValidator, emailValidator, idValidator };
