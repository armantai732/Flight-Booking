import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const { DBConnect } = await import("./config/db.js");
const { default: routes } = await import("./router/router.js");

const app = express();

app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://flight-booking-vgm.vercel.app/api"
    ],
    credentials: true
}));

app.use(express.json());

await DBConnect();

app.use("/api", routes);

app.listen(process.env.PORT || 8080, () => {
    console.log("Server Running on 8080");
});