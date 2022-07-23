const { Router } = require('express')
const {getUserById, createUser} = require("../controllers/user-controller");

const router = Router()

router.post('/', createUser)

router.get('/:id', getUserById)

module.exports = router