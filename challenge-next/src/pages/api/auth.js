import {sha256} from 'js-sha256'
import api from '../../repositories/backend-api'
import cors from '../../middlewares/cors'

export default async (req, res) => {
    try {
        await cors(req, res, cors)

        if (req.method === "POST") {
            const credentials = req.body
            credentials.password = sha256(credentials.password)

            const response = await api.post(
                { 
                    endpoint: `/auth`,
                    params: credentials
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