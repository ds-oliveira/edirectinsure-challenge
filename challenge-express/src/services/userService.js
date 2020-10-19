const { Success, Fail } = require('monet')
const logger = require('../utils/logger')
const mongo = require('../repositories/mongo')

const fetchUser = async (query) => {
    try{
        const user = await mongo.findOne('user', query )
        
        return Success(user)
    }catch(err){
        logger.error(err.stack)

        return Fail(new Error(`Error while fetching the user`))
    }
}

const insertUser = async (user) => {
    try{
        const result = await mongo.insertOne('user', user)
        
        return Success(result)
    }catch(err){
        logger.error(err.stack)

        return Fail(new Error("Error while inserting a new user"))
    }
}

const updateToken = async({email, password,token}) => {
    try{
        await mongo.updateOne('user', {email, password}, {token})
        
        return Success(token)
    }catch(err){
        logger.error(err.stack)

        return Fail(new Error("Error while saving the new token"))
    }
}

const updateProjects = async({token, projects}) => {
    try{
        await mongo.updateOne('user', {token}, {projects})
        
        return Success(projects)
    }catch(err){
        logger.error(err.stack)

        return Fail(new Error("Error while saving the new token"))
    }
}

module.exports = {
    fetchUser,
    insertUser,
    updateToken,
    updateProjects,
}
