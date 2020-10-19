const { pipe, prop } = require('ramda');

const extractEmailAndPassword = pipe(
    prop('body'),
    ({email, password}) => ({email, password})
)

module.exports = {
    extractEmailAndPassword
}