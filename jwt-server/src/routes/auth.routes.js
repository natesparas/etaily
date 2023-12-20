const express = require('express')
const router = express.Router()

const {
    loginUser, validateToken
} = require('../controllers/auth.controller')

router.post('/login', loginUser)
router.get('/validate', validateToken)

module.exports = router
