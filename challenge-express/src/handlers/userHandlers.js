const { pipe, isEmpty} = require('ramda')

const userServices = require('../services/userService')
const { extractInsertedId, extractUserToken } = require('../helpers/commonHelper')
const {
    extractUserFromBody,
    removeIdFromUser,
    removePasswordFromUser,
    generateToken,
    encryptUserPassword,
    attachToken
} = require('../helpers/userHelper')

const handleFetchUser = async (req, res) => {
    const token = extractUserToken(req)

    const userServiceResponse = await userServices.fetchUser({token})

    if (userServiceResponse.isFail()) {
        return res.status(500).send({ message: userServiceResponse.fail().message })
    }

    const user = userServiceResponse.success()

    if(isEmpty(user)){
        return res.status(401).send({message: "Invalid authentication token"})
    }

    return res.status(200).send(removePasswordFromUser(user))
}

const handleInsertUser = async (req, res) => {
    const user = await pipe(
        extractUserFromBody,
        removeIdFromUser,
        encryptUserPassword
    )(req)

    const verifyUserExistsServiceResponse = await userServices.fetchUser({email: user.email, status: "active"})
    
    if (verifyUserExistsServiceResponse.isFail()) {
        return res.status(500).send({ message: verifyUserExistsServiceResponse.fail().message })
    }

    if(!isEmpty(verifyUserExistsServiceResponse.success())){
        return res.status(409).send({message: "User already registered"})
    }

    const userInsertServiceResponse = await userServices.insertUser(user)

    if (userInsertServiceResponse.isFail()) {
        return res.status(500).send({ message: userInsertServiceResponse.fail().message })
    }

    const userTokenServiceResponse = await pipe(
        response => response.success(),
        extractInsertedId,
        generateToken,
        attachToken(user),
        userServices.updateToken
    )(userInsertServiceResponse)

    if (userTokenServiceResponse.isFail()) {
        return res.status(500).send({ message: userTokenServiceResponse.fail().message })
    }

    return res.status(200).send({token : userTokenServiceResponse.success()})
}

module.exports = {
    handleFetchUser,
    handleInsertUser
}