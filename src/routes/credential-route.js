const {Router} = require('express')
const {patchAccount} = require("../controllers/credential-controller");

const router = Router()

router.patch('/:email', patchAccount)

module.exports = router