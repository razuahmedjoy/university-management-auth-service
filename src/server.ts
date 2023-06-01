import mongoose from "mongoose";
import app from "./app";
import config from "./config";

async function bootstrap(){
    try {
        await mongoose.connect(config.databaseURL as string,)
        
        console.log('Database connected Successfully');
        app.listen(config.port,()=>{
            console.log(`Server is running on port http://localhost:${config.port}`)
        })

    } catch (error) {
        console.log(error)  
    }
}

bootstrap();