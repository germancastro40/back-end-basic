const {response, request}= require('express')

const usuariosGet= (req= request, res= response) => {
  const params= req.query
    res.json({
      msg:'Get API- controller',
      params
    })
}

const usuariosPut=(req, res) => {
  const {id} = req.params
    res.json({
      msg:'Put API-controller',
      id
    })
}

const usuariosDelete=(req, res) => {
    res.json({
      msg:'Delete API-controller'
    })
  }

const usuariosPost=(req, res) => {

  const {nombre, edad} = req.body

    res.json({
      msg:'Post API-controller',
      nombre, edad
    })
  }

module.exports= {
    usuariosGet, usuariosPut, usuariosDelete,usuariosPost
}
