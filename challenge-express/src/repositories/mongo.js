const { MongoClient } = require('mongodb')
const { defaultTo, andThen, pipe} = require('ramda')

const { MONGO_DATABASE: databaseName = 'challenge', MONGO_ENDPOINT: endpoint = 'mongodb://localhost:27017' } = process.env

const createClient = () => new MongoClient(endpoint)

const findOne = async (collectionName, query) => executeCommand(async (client) => {
    const database = client.db(databaseName)
    const collection = database.collection(collectionName)

    return pipe(
        () =>  collection.findOne(query),
        andThen(defaultTo({}))
    )()
})

const insertOne = async (collectionName, object) => executeCommand(async (client) => {
    const database = client.db(databaseName)
    const collection = database.collection(collectionName)

    return collection.insertOne(object)
})

const updateOne = async(collectionName, query, set) => executeCommand(async (client) => {
    const database = client.db(databaseName)
    const collection = database.collection(collectionName)

    return collection.updateOne(query, {$set: set})
})

const executeCommand = async (command) => {
    const client = createClient()

    try {
        await client.connect()
        return command(client)
    } finally {
        await client.close()
    }
}

module.exports = {
    findOne,
    insertOne,
    updateOne
}