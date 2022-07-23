const { Router } = require('express')
const {getUserById, createUser, getUsers} = require("../controllers/user-controller");

const router = Router()

router.post('/', createUser)

router.get('/:id', getUserById)

router.get('/', getUsers)

module.exports = router