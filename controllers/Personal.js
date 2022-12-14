const { request, response , json } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require("../db/conecction");
const {modeloPersonal} = require("../models/Personal");

const addPersonal = async (req = request, res = response) => {   
    const {
        Nombre_Personal,
        DeptoP,
        Falla,
        Horario
    } = req.body

    if (
        !Nombre_Personal||
        !DeptoP||
        !Falla||
        !Horario
    ){
        res.status(400).json({msg: "Lo lamento, falta informacion del personal"})    
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloPersonal.queryuserExists,[Nombre_Personal])

        if (user){
            res.status(403).json({msg:`El Personal '${Nombre_Personal}' ya se encuentra registrado en el sistema`})
            return
        }
          
        const salt = bcryptjs.genSaltSync()

        const {affecteRows} = await conn.query(modeloPersonal.queryaddPersonal,[
            Nombre_Personal,
            DeptoP,
            Falla,
            Horario
            ], (error) => { throw new Error})
 
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro de Personal correspondiente a ${Nombre_Personal}`})
            return
            }
            
        res.json({msg:`El Personal ${Nombre_Personal} se logro agregaar satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})
    } finally {
        if(conn){
            conn.end()
        }
    }
}

const deletePersonalByID = async (req = request, res = response) => {   
    const {ID_P} = req.query
    let conn;

    try {
        conn = await pool.getConnection()
        const {affecteRows} = await conn.query(modeloPersonal.querydeletePersonalByID,[ID_P],(error) => { throw new Error })
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo Eliminar el Personal con el ${ID_P}`})
            return
            }
            
        res.json({msg:`El Personal con ID ${ID_P} se elimino satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally {
        if(conn){
            conn.end()
        }
    }
}

const getPersonalByID = async (req = request, res = response) => {   
    const {id} = req.params
    let conn;

    try {
        conn = await pool.getConnection()
        const [user] = await conn.query(modeloPersonal.querygetUserByID,[ID_P], (error) => { throw new Error})

        if(!user){
            res.status(404).json({msg:`Lo lamento, no se encontraron registro con el ID ${ID_P}`})
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


module.exports ={addPersonal, deletePersonalByID, getPersonalByID}