const { ObjectID } = require('mongodb')

const extractProjectsFromBody = ({body}) => body

const setIds = (projects) => projects.map(p => {
    if(!p._id){
        p._id = new ObjectID();
    }else{
        p._id = new ObjectID(p._id)
    }

    p.tasks.map(t => {
        if(!t._id){
            t._id = new ObjectID();
        } else{
            t._id = new ObjectID(t._id)
        }
    })

    return p
})

module.exports = {
    extractProjectsFromBody,
    setIds
}