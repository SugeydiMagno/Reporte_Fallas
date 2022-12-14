const {Router} = require("express")
const { getPersonalByID, deletePersonalByID, addPersonal} = require ("../controllers/Personal")
const router = Router()

//http://localhost:5001/api/v1/usuarios?id=6

//GET ///

router.get("/id/:id", getPersonalByID)

//POST//

router.post("/", addPersonal)

//DELETE//

router.delete("/" , deletePersonalByID)

module.exports = router