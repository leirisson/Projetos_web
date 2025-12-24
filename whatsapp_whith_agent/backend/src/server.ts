import 'dotenv/config.js'
import { app } from './app'



async function startServer(){
    try {
        const PORT = Number(process.env.PORT) || 3333
        app.listen({port: PORT})
        console.log(`serve is runing => http://localhost:${PORT}`)
    } catch (error) {
        console.error(error)
    }
}

startServer()