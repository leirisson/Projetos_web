import { app } from './app'
import { env } from './env'


function startServer(){
    try {
        app.listen({
            host: '0.0.0.0',
            port: env.PORT,
        })
        console.log(`Server is running on port ${env.PORT}`)
    } catch (error) {
        console.error('Error starting server', error)
        throw error
    }
}

startServer()