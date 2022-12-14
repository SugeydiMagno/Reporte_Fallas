const {Router} = require("express")
const {getUsuarios, getUsuariosByID, deleteUsuariosByID, addUSuarios, updateUserByeUsuarios} = require ("../controllers/Usuarios")
const router = Router()

//http://localhost:5001/api/v1/usuarios?id=6

//GET ///

router.get("/", getUsuarios)
router.get("/id/:id", getUsuariosByID)

//POST//

router.post("/", addUSuarios)

//PUT//
router.put("/", updateUserByeUsuarios)

//DELETE//

router.delete("/" , deleteUsuariosByID)

module.exports = router