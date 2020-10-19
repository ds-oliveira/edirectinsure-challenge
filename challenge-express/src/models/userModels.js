const User = ({ _id, name, email, password, projects = [], token, status="active" }) => ({
    _id,
    name,
    email,
    password,
    projects,
    token,
    status
})

module.exports = {
    User
}