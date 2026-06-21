import express from "express";
import { igdbRouter } from "./routes/igdb.routes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/game", igdbRouter);
export default app;
