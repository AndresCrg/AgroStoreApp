require('dotenv').config()
const express = require('express')
const cors = require('cors')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.middleware()
        this.routes()
    }

    middleware(){
        this.app.use(express.json())
    }

    routes(){
        this.app.use('/api/users', require('../routes/user-route'))
    }

    listen(){
        this.app.listen(this.port,() =>{
            console.log(`Server listening on port ${this.port}`);
        })
    }
}

module.exports = Server