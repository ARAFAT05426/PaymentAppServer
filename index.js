import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser"
dotenv.config()
const app = express()
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.get("/", async(req, res) =>{
    res.send("Hello Kuickpay")
})
app.listen(5426, () =>{
    console.log("Kuickpay");
})