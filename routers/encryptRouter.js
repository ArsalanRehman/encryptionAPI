const express = require('express')
const encryptController = require('./../controllers/encryptController')

const router = express.Router()

router.post('/textToCaesar', encryptController.encrypt_to_Caesar)

module.exports = router
