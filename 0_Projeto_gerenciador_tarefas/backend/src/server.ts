import { app } from '@/app'
import { env } from './env'

function startServer(){
    try {
        app.listen({
            host: '0.0.0.0',
            port: env.PORT
        })
        console.log(`SERVER HTTP IS RUNING IN => http://locaohost:${env.PORT}/api/v1`)
    } catch (error) {
        console.log(error)
    }
}

startServer()