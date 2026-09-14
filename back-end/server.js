import express from 'express'
import { DBConnect } from './config/db.js';
import dotenv from 'dotenv';
import routes from './router/router.js';
import cors from 'cors';
dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

await DBConnect();

app.use("/api", routes);

app.listen(process.env.PORT, ()=>{
    console.log("Server Running on 8080");
})