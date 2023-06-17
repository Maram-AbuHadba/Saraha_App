
import * as dotenv from 'dotenv' 
dotenv.config()
import express from 'express';
import initApp from './src/modules/app.router.js';
import connectDB from "./DB/connection.js"

const app = express()

const port = 3000
initApp(app,express)
connectDB().then(()=>{
    app.listen( process.env.port || port, () => console.log(`Example app listening on port ${port}!`))
})
// بعدها يطلعلي انو اتصل و  اول اشي يتصل بالداتا بيس

