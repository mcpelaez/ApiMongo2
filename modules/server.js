const express = require('express')
const { dbConnection } = require('../database/config')
const cors  = require('cors');
const bodyParser = require('body-parser')


 

class Server{

    constructor(){

        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.authPath = '/api/auth'
        this.middlewares()
        this.routes()
        this.concetarDb()
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Eschando por el puerto ${this.port}`)
        })
    }

    middlewares() {
         //CORS
        this.app.use( cors() );

        this.app.use(bodyParser.json()) // for parsing application/json

        this.app.use(express.static(__dirname + "/public"));
        //this.app.use(express.json())
    }

    routes() {
        //OBTENER O CONSULTAR
        /*this.app.get('/api', (req, res) => {
            const { doc, nombre } = req.query
            res.json({
                msg:'get API',
                doc,
                nombre
            })
        })*/
        this.app.use(this.usuariosPath, require('../routes/usuarios'))
        this.app.use(this.authPath, require('../routes/auth'))
    }

    async concetarDb(){
        await dbConnection()
    }
}

module.exports = Server


