import express from "express";
import cors from "cors";
import mailBoxRouter from "./routes/mailBox.route";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/mail", mailBoxRouter);

export default app;


