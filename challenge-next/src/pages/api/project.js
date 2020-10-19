import api from '../../repositories/backend-api'
import cors from '../../middlewares/cors'

export default async (req, res) => {
    try {
        await cors(req, res, cors)

        if (req.method === "PUT") {
            const projects = req.body
            const response = await api.put(
                { 
                    endpoint: `/project`,
                    params: projects,
                    token: req.headers.token
                }
            )
            return res.status(response.status).send(response.data)
        }

        return res.status(404).send({ message: "Method not implemented" })
    } catch (err) {
        if (err.response)
            return res.status(err.response.status).send(err.response.data)

        return res.status(500).send(err.message)
    }
}