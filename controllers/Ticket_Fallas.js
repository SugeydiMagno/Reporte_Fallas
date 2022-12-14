const { request, response , json } = require("express")
const bcryptjs = require("bcryptjs")
const pool = require("../db/conecction");
const {modeloTicket_Fallas} = require("../models/Ticket_Fallas");

const addTicket = async (req = request, res = response) => {   
    const {
        Resp,
        DeptoT,
        Especificaciones,
        TipFalla,
        Fecha = '1900-01-01',
        PersonAsign
    } = req.body

    if (
        !Resp ||
        !DeptoT ||
        !Especificaciones ||
        !TipFalla ||
        !PersonAsign
    ){
        res.status(400).json({msg: "Lo lamento, falta informacion del Ticket "})    
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloTicket_Fallas.queryuserExists,[Especificaciones])

        if (user){
            res.status(403).json({msg:`El Ticket '${Especificaciones}' ya se encuentra registrado en el sistema`})
            return
        }
          
        const salt = bcryptjs.genSaltSync()

        const {affecteRows} = await conn.query(modeloTicket_Fallas.queryAddTicket,[
            Resp,
            DeptoT,
            Especificaciones,
            TipFalla,
            Fecha ,
            PersonAsign
            ], (error) => { throw new Error})
 
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo agregar el registro de Ticket correspondiente a ${Especificaciones}`})
            return
            }
            
        res.json({msg:`El Personal ${Especificaciones} se logro agregaar satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({json})
    } finally {
        if(conn){
            conn.end()
        }
    }
}

const deleteTicketByID = async (req = request, res = response) => {   
    const {ID_P} = req.query
    let conn;

    try {
        conn = await pool.getConnection()
        const {affecteRows} = await conn.query(modeloTicket_Fallas.querydeleteTicketByID,[ID_T],(error) => { throw new Error })
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo Eliminar el ticket con el ${ID_T}`})
            return
            }
            
        res.json({msg:`El Ticket con ID ${ID_T} se elimino satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    } finally {
        if(conn){
            conn.end()
        }
    }
}

const getTicketByID = async (req = request, res = response) => {   
    const {ID_T} = req.params
    let conn;

    try {
        conn = await pool.getConnection()
        const [user] = await conn.query(modeloTicket_Fallas.querygetTicketByID,[ID_T], (error) => { throw new Error})

        if(!user){
            res.status(404).json({msg:`No se encontraron registros de ticket  con el ID ${ID_T}`})
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

const updateTicketByeTicket = async (req = request, res = response) => {   
    const {
        Resp,
        DeptoT,
        Especificaciones,
        TipFalla,
        Fecha = '1900-01-01',
        PersonAsign
    } = req.body

    if (
        !Resp ||
        !DeptoT ||
        !Especificaciones ||
        !TipFalla ||
        !PersonAsign 
    ) 
    {
        res.status(400).json({msg: "Falta informacion del Ticket"})    
        return
    }

    let conn;

    try {
        conn = await pool.getConnection()

        const [user] = await conn.query(modeloTicket_Fallas.queryGetTicketInfo, [Especificaciones])

        if (!user){
            res.status(403).json({msg:`El Ticket '${Especificaciones}' no se encuentra registrado `})
            return
        }
        
        const {affecteRows} = await conn.query(updateTicket(
            Resp,
            DeptoT,
            Especificaciones,
            TipFalla,
            Fecha ,
            PersonAsign
        ), (error) => { throw new Error(error) })
  
        if(affecteRows===0){
            res.status(404).json({msg:`No se pudo actualizarr el registro del Ticket ${Especificaciones}`})
            return
            }
    
        res.json({msg:`El Ticket ${addTicket} se actualizo satisfactoriamente.`})
    } catch (error) {
        console.log(error)
        res.status(500).json({error})
    } finally {
        if(conn){
            conn.end()
        }
    }
}

module.exports ={addTicket,deleteTicketByID,getTicketByID, updateTicketByeTicket}
