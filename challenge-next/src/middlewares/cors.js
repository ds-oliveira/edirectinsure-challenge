import Cors from 'cors'
import initMiddleware from './initMiddleware'

const cors = initMiddleware(
  Cors({
    origin: false
  })
)

export default cors