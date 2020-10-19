const { pipe, isEmpty} = require('ramda')

const userServices = require('../services/userService')
const { extractProjectsFromBody,setIds } = require('../helpers/projectHelper')
const { extractUserToken } = require('../helpers/commonHelper')

const handleUpdateProjects = async (req, res) => {
    const token = extractUserToken(req)

    const userServiceResponse = await userServices.fetchUser({token})

    if (userServiceResponse.isFail()) {
        return res.status(500).send({ message: userServiceResponse.fail().message })
    }

    const user = userServiceResponse.success()

    if(isEmpty(user)){
        return res.status(400).send({message: "Invalid authentication token"})
    }

    const projects = pipe(
        extractProjectsFromBody,
        setIds
    )(req)

    const projectsUpdateResponse = await userServices.updateProjects({token, projects})

    if (projectsUpdateResponse.isFail()) {
        return res.status(500).send({ message: projectsUpdateResponse.fail().message })
    }

    return res.status(200).send(projectsUpdateResponse.success())
}

module.exports = {
    handleUpdateProjects
}