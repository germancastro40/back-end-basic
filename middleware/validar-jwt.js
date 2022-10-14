const { response, request } = require('express')
const jwt = require('jsonwebtoken')

const validarJWT = (req = request, res= response, next)=>{

    const token = req.header('token-x')
    
    console.log(token);

    next()
}


module.exports={validarJWT}












