const { path, prop } = require('ramda')
const { sha256 } = require("js-sha256")

const extractIdFromParams = path(['params', 'id'])

const extractInsertedId = prop('insertedId')

const extractId = prop('_id')

const extractUserToken = path(['headers','token'])

const encrypt = sha256


module.exports = {
    extractIdFromParams,
    extractUserToken,
    extractInsertedId,
    encrypt,
    extractId
}