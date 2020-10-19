const router = require('express').Router()
const { authenticateWithEmailAndPassword } = require('../handlers/authHandlers')

router.post('/auth', authenticateWithEmailAndPassword)

module.exports = router