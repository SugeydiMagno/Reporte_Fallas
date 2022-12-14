const { request, response , json } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require("../db/conecction");
const {modeloUsuarios} = require("../models/usuarios");

const getUsuarios = async (req = request, res = response) => {   
        let conn;
    
        try {
            conn = await pool.getConnection()
            const [users] = await conn.query(modeloUsuarios.querygetUsers, (error) => { throw new Error })
    
            if(!users){
                res.status(404).json({msg: "No encontramos registros "})
                return
            }
            res.json({users})
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        } finally {
            if(conn){
                conn.end()
            }
        }
    }

const getUsuariosByID = async (req = request, res = response) => {   
        const {ID_U} = req.params
        let conn;
    
        try {
            conn = await pool.getConnection()
            const [user] = await conn.query(modeloUsuarios.querygetUserByID,[ID_U], (error) => { throw new Error})
    
            if(!user){
                res.status(404).json({msg:`No hemos encontrado registros con el ID ${ID_U}`})
                return
            }
    
            res.json({user})
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
    
        } finally {
            if(conn){
                conn.end()
            }
        }
    }

const deleteUsuariosByID = async (req = request, res = response) => {   
        const {ID_U} = req.query
        let conn;
    
        try {
            conn = await pool.getConnection()
            const {affecteRows} = await conn.query(modeloUsuarios.querydeleteUserByID,[ID_U],(error) => { throw new Error })
            if(affecteRows===0){
                res.status(404).json({msg:`No se pudo Eliminar el registro con el ${ID_U}`})
                return
                }
                
            res.json({msg:`El usuario con ID ${ID_U} se logro eliminar  satisfactoriamente.`})
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
    
        } finally {
            if(conn){
                conn.end()
            }
        }
    }

const addUSuarios = async (req = request, res = response) => {   
        const {
            Nombre_Usuario,
            DeptoU,
            Contraseña
        } = req.body
    
        if (
            !Nombre_Usuario ||
            !DeptoU ||
            !Contraseña 
        ){
            res.status(400).json({msg: "Lo lamento, falta informacion del usuario"})    
            return
        }
    
        let conn;
    
        try {
            conn = await pool.getConnection()
    
            const [user] = await conn.query(modeloUsuarios.queryuserExists,[Nombre_Usuario])
    
            if (user){
                res.status(403).json({msg:`El Usuario '${Nombre_Usuario}' ya se encuentra registrado `})
                return
            }
              
            const salt = bcryptjs.genSaltSync()
            const ContraseñaCifrada = bcryptjs.hashSync(Contraseña,salt)
    
            const {affecteRows} = await conn.query(modeloUsuarios.queryAddUser,[
                Nombre_Usuario,
                DeptoU,
                Contraseña
                ], (error) => { throw new Error})
     
            if(affecteRows===0){
                res.status(404).json({msg:`No se pudo agregar el registro el registro del usuario ${Nombre_Usuario}`})
                return
                }
                
            res.json({msg:`El usuario ${Nombre_Usuario} se logro agregar satisfactoriamente.`})
        } catch (error) {
            console.log(error)
            res.status(500).json({json})
        } finally {
            if(conn){
                conn.end()
            }
        }
    }    

const updateUserByeUsuarios = async (req = request, res = response) => {   
        const {
            Nombre_Usuario,
            DeptoU,
            Contraseña
        } = req.body
    
        if (
            !Nombre_Usuario ||
            !DeptoU ||
            !Contraseña  
        ) 
        {
            res.status(400).json({msg: "Lo lamento falta informacion del usuario"})    
            return
        }
    
        let conn;
    
        try {
            conn = await pool.getConnection()
    
            const [user] = await conn.query(modeloUsuarios.queryGetUserInfo, [Usuarios])
    
            if (!user){
                res.status(403).json({msg:`El Usuario '${Nombre_Usuario}' no se encuentra registrado `})
                return
            }
            
            const {affecteRows} = await conn.query(updateUsuario(
                Nombre_Usuario,
                DeptoU,
                Contraseña
            ), (error) => { throw new Error(error) })
      
            if(affecteRows===0){
                res.status(404).json({msg:`Lo lamento, no se pudo actualizarr el registro el registro del usuario ${Nombre_Usuario}`})
                return
                }
        
            res.json({msg:`El usuario ${Nombre_Usuario} se logro actualizar satisfactoriamente.`})
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        } finally {
            if(conn){
                conn.end()
            }
        }
    }
    

module.exports ={ getUsuarios,getUsuariosByID,deleteUsuariosByID,addUSuarios, updateUserByeUsuarios}