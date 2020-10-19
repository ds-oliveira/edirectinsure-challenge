const router = require('express').Router()
const {handleIsHealth} = require('../handlers/healthHandlers')

router.get('/health', handleIsHealth)

module.exports= router