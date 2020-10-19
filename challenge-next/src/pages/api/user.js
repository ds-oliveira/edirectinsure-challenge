import {sha256} from 'js-sha256'
import api from '../../repositories/backend-api'
import cors from '../../middlewares/cors'

export default async (req, res) => {
    try {
        await cors(req, res, cors)

        if (req.method === "GET") {
            const response = await api.get(
                { 
                    endpoint: `/user`,
                    token: req.headers.token
                },
            )
            return res.status(response.status).send(response.data)
        }

        if (req.method === "POST") {
            const user = req.body
            user.password = sha256(user.password)
            const response = await api.post(
                { 
                    endpoint: `/user`,
                    params: user
                }
            )
            return res.status(response.status).send(response.data)
        }

        if (req.method === "PUT") {
            const user = req.body
            const response = await api.put(
                { 
                    endpoint: `/user`,
                    params: user
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