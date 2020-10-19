const { pipe, prop, cond, path, T, isNil, tap, propEq } = require('ramda')
const apiKeys = require('../resources/apiKeys.json')

const validateApiKey = (req, res, next) => pipe(
    path(['headers', 'api_key']),
    (key) => prop(key)(apiKeys),
    cond([
        [() => propEq('url','/health')(req), () => next()],
        [isNil, () => res.status(401).send({ message: 'Invalid API Key' })],
        [T, () => next()]
    ])
)(req)

module.exports = validateApiKey;