import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./config";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
