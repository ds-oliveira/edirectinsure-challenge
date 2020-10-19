const {isEmpty, pipe} = require('ramda')
const {extractEmailAndPassword} = require('../helpers/authHelper')
const {
    generateToken,
    attachToken,
    encryptUserPassword
} = require('../helpers/userHelper')
const { extractId } = require('../helpers/commonHelper')

const userServices = require('../services/userService')

const authenticateWithEmailAndPassword = async (req,res) => {
    const credentials = pipe(
        extractEmailAndPassword,
        encryptUserPassword
    )(req)
    
    if(isEmpty(credentials)){
        return res.status(400).send({ message: "Invalid credentials" })
    }

    const userFetchServiceResponse = await userServices.fetchUser(credentials);

    if (userFetchServiceResponse.isFail()) {
        return res.status(500).send({ message: userFetchServiceResponse.fail().message })
    }

    const user = userFetchServiceResponse.success()

    if (isEmpty(user)){
        return res.status(401).send({ message: `Invalid email or password` })
    }
    
    const userTokenServiceResponse = await pipe(
        extractId,
        generateToken,
        attachToken(user),
        userServices.updateToken
    )(user)

    if (userTokenServiceResponse.isFail()) {
        return res.status(500).send({ message: userTokenServiceResponse.fail().message })
    }

    return res.status(200).send({token : userTokenServiceResponse.success()})
}

module.exports = {
    authenticateWithEmailAndPassword
}