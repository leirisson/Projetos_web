import {app} from './app';
import { env } from './env';

function startServer(){
    try{
        app.listen({
            port: env.PORT,
            host: '0.0.0.0',
        });
        console.log(`Server is running on port ${env.PORT}`);
    }catch(err){
        console.log(err);
        throw new Error('Failed to start server');
    }
}

startServer();