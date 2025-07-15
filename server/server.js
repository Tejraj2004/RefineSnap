import 'dotenv/config' //to get all env variables
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongodb.js'
//App Config
const PORT = process.env.PORT || 4000
const app = express()
await connectDB()


//Initialise Middlewares
app.use(express.json())//to parse any request
app.use(cors())// cors helps us to connect our client running on differnt port

//API routes
app.get('/',(req,res)=>res.send("API Working"))

app.listen(PORT, ()=> console.log("Server Running on port "+PORT))
 