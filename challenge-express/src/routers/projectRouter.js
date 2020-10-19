const router = require('express').Router()
const { handleUpdateProjects } = require('../handlers/projectHandlers')

router.put('/project', handleUpdateProjects)

module.exports = router