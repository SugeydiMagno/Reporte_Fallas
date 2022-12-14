const express = require ('express')
const messagesRouter = require ('./routes/messages.js')
const UsuariosRouter = require ('./routes/Usuarios')
const PersonalRouter = require ('./routes/Personal')
const Ticket_FallasRouter = require ('./routes/Ticket_Fallas')

const cors = require("cors")

class Server{
    constructor (){
        this.app = express ()
        this.paths = {
        messages:"/api/v1/messages",
        Usuarios:"/api/v1/Usuarios",
        Personal:"/api/v1/Personal"
        }

        this.middlewares()
        this.routes()
        
    }

    routes(){                                                            
        this.app.use(this.paths.messages, messagesRouter)
        this.app.use(this.paths.Usuarios, UsuariosRouter)
        this.app.use(this.paths.Personal, PersonalRouter)
        this.app.use(this.paths.Ticket_Fallas, Ticket_FallasRouter)
    }

    middlewares (){
        this.app.use(cors()) //Permite solicitudes de origen cruzado
        this.app.use(express.json()) // Habilita la lectura de contenido en formato json
    }

    listen(){
        this.app.listen(process.env.PORT, () => {
            console.log(process.env.PORT);
        })
    }
}

module.exports = Server