const router = require('express').Router()
const { handleFetchUser, handleInsertUser } = require('../handlers/userHandlers')

router.get('/user', handleFetchUser)
router.post('/user', handleInsertUser)

module.exports = router