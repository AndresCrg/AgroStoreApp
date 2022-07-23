const { Router } = require('express')
const {getUserById, createUser, getUsers, updateUser} = require("../controllers/user-controller");

const router = Router()

router.post('/', createUser)

router.get('/:id', getUserById)

router.get('/', getUsers)

router.put('/:id', updateUser)

module.exports = router