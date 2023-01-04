const express = require('express');
const cors = require('cors');

class Server{

    constructor(){
        this.app = express();
        this.port = 8081;
        this.authPath = '/files/data';
        this.middlewares();
        this.routes();
    }
    async conectarDB(){
        await dbConnection();
    }

    middlewares(){
        //cors
        this.app.use(cors());

        //Lectura y parseo del codigo
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'))
    }
    routes(){
        this.app.use(this.authPath, require('../routes/auth'));
    
    }
    listen(){
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;