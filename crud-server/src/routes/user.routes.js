const express = require('express')
const router = express.Router()

const { listUser, createUser, updateUser, deleteUser } = require('../controller/user.controller')

router.get('/list', listUser)
router.post('/create', createUser)
router.put('/update/:id', updateUser)
router.delete('/delete/:id', deleteUser)

module.exports = router
