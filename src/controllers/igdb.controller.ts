import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

interface GameRequestBody {
  gameTitle: string;
}
const getGameData = asyncHandler(async (req: Request, res: Response) => {
  const { gameTitle } = req.body;

  if (!gameTitle) {
    return res.status(400).json({ message: "gameTitle is required" });
  }

  return res.json({ gameTitle });
});
