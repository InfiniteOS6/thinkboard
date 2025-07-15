import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(rateLimiter);
const port = process.env.PORT || 5001;
app.use("/api/notes", notesRoutes);

connectDB().then(() =>{
    app.listen(port, () =>{
        console.log("server started at port: ", port);
    });
});