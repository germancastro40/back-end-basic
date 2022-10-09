const express = require("express");
const cors = require("cors");

const {dbConnection}= require('../db/db')
class server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //conectar database
    this.conectarDB()

    //middleaware
    this.middleware();

    this.routes();
  }

  async conectarDB(){
    await dbConnection()
  }

  middleware() {
    this.app.use(cors());

    //lectura y parseo del body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(require("../routes/usuarios"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Corriendo en: " + this.port);
    });
  }
}

module.exports = server;
