const handleIsHealth = (req, res) => {
    res.status(200)
    res.send({status: 'OK'})
}

module.exports = {
    handleIsHealth
}