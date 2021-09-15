import app from "./server.js";
import mongodb from 'mongodb';
import dotenv from "dotenv";

dotenv.config()
const MongoClient = mongodb.MongoClient
const port =process.env.PORT || 8000
const dbUir =process.env.BEEP_DB_URI

MongoClient.connect(dbUir,
    {
      maxPoolSize:100,
      wtimeoutMS:2500,
      useNewUrlParser:true }
    )
    .catch(err=>{
        console.error(err.stack);
        process.exit(1)
    })
    .then(async client => {

        app.listen(port,()=>{console.log(`Server Running On Port ${port}`)
        })
    })
    .catch(err=>{
        console.error(err.stack);
    })

