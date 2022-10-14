const { response } = require("express");
const bcryptjs= require('bcryptjs')
const Usuario = require('../models/usuario');
const {generarJWT} = require("../helpers/generar-jwt");

const login =async (req, res = response)=>{

    const {correo, password}= req.body

    try {
        //verficar si el email existe
        const usuario= await Usuario.findOne({correo})
        if(!usuario){
            return res.status(400).json({
                msg:'Usuario/Password no son validos-correo' //solo dejar usu/pass no validos
            })
        }
        //verificar si el usuario esta activo
        if(usuario.status===false){
            return res.status(400).json({
                msg:'Usuario/Password no son validos-estatus:false' //solo dejar usu/pass no validos
            })
        }
        //Verificar contraseña
        const validarPass= bcryptjs.compareSync(password, usuario.password)
        if(validarPass===false){
            return res.status(400).json({
                msg:'Usuario/Password no son validos-password' //solo dejar usu/pass no validos
            })
        }

        //generar jwt
        const token = await generarJWT( usuario.id ) 
        res.json({
            usuario, token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el admin'
        })
    }

    // res.json({
    //     msg: 'Login, ok',
    //     correo, password
    // })
}

module.exports= {
    login
}