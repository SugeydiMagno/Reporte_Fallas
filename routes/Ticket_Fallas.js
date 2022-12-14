const {Router} = require("express")
const {addTicket, deleteTicketByID, getTicketByID, updateTicketByeTicket} = require ("../controllers/Ticket_Fallas")
const router = Router()

//http://localhost:5001/api/v1/usuarios?id=6

//GET ///

router.get("/id/:id", getTicketByID)

//POST//

router.post("/", addTicket)

//PUT//
router.put("/", updateTicketByeUsuario)

//DELETE//

router.delete("/" , deleteTicketByID)

module.exports = router