import Router from "express";
import { getGameId, getGameData } from "../controllers/igdb.controller.js";
const igdbRouter = Router();

igdbRouter.route("/igdb-id").post(getGameId);
igdbRouter.route("/getGameInfo").post(getGameData);

export { igdbRouter };
