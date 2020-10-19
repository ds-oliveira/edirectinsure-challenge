const app = require('express')()
const bodyParser = require('body-parser')
const cors = require('cors')
const swaggerUi = require('swagger-ui-express');

const logger = require('./utils/logger')
const healthRouter = require('./routers/healthRouter')
const userRouter = require('./routers/userRouter')
const authRouter = require('./routers/authRouter')
const projectRouter = require('./routers/projectRouter')
const openApiDocumentation = require('./resources/documentation.json');
const apiKeyMiddleware = require('./middlewares/apiKeyMiddleware') 

const { APPLICATION_PORT: applicationPort = 3000} = process.env;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));
app.use(bodyParser.json())
app.use(cors())
app.use(apiKeyMiddleware)
app.use(healthRouter)
app.use(userRouter)
app.use(authRouter)
app.use(projectRouter)


app.listen(applicationPort, () => {
    logger.info(`Application running on port: ${applicationPort}`)
})