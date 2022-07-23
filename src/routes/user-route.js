const { Router } = require('express')
const {getUser, createUser} = require("../controllers/user-controller");

const router = Router()

router.post('/', createUser)

router.get('/', getUser)

module.exports = router