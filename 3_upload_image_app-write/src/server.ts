import {app} from './app';


function startServer(){
    try{
        app.listen({
            port: 3000,
            host: '0.0.0.0',
        });
        console.log(`Server is running on port 3000`);
    }catch(err){
        console.log(err);
    }
}

startServer();