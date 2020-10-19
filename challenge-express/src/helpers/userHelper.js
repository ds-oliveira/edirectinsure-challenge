const { pipe, prop, dissoc } = require('ramda')
const { sha256 } = require("js-sha256")
const { User} = require('../models/userModels')

const extractUserFromBody = pipe(
    prop('body'),
    User
)

const removeIdFromUser =  dissoc('_id')

const removePasswordFromUser = dissoc('password')

const generateToken = (userId) => sha256(`${userId}|${Date.now().toString()}`)

const encryptUserPassword = (user) => ({...user, password: sha256(user.password)})

const attachToken = (user) => (token) => ({...user, token})

module.exports = {
    extractUserFromBody,
    removeIdFromUser,
    removePasswordFromUser,
    generateToken,
    encryptUserPassword,
    attachToken
}