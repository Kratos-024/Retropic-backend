import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler.js";

interface GameRequestBody {
  gameTitle: string;
}
// const clientId = process.env.IGDB_CLIENT_ID || "7yts2bw4x8oxcgsvv3d54t0m0ljioi";
// const token = process.env.ACCESS_TOKEN || "bjukud1jp64wnuwx0in8p9m69fjd4j";
const URI = "https://api.igdb.com/v4/games";

const PSP_PLATFORM_ID = 38;

const getGameId = async (gameTitle: string) => {
  if (!gameTitle) {
    return { message: "gameTitle is required" };
  }
  console.log("gameTitle", gameTitle);
  const body = `search "${gameTitle}"; fields id, name; where platforms = (${PSP_PLATFORM_ID}); limit 5;`;
  const response = await fetch(URI, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${clientId}`,
      Authorization: `Bearer ${token}`,
    },
    body: body,
  });
  const data = await response.json();
  console.log("data", data);

  return data;
};

const getSimilarGames = async (similar_games: number[]) => {
  const similar_games_data: any[] = [];

  if (similar_games.length > 0 && similar_games[0] != undefined) {
    for (let i = 0; i < similar_games.length; i++) {
      // const body = `fields name, cover.url; where id = (${similar_games[i]});`;
      const body = `fields name, cover.url; where id = (${similar_games[i]}) & platforms = (${PSP_PLATFORM_ID});`;

      const response = await fetch(URI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Client-ID": `${clientId}`,
          Authorization: `Bearer ${token}`,
        },
        body: body,
      });

      const data = await response.json();

      similar_games_data.push(data);
    }

    return similar_games_data;
  }
};

const getGameData = asyncHandler(async (req: Request, res: Response) => {
  const { title } = req.body;
  if (!title) {
    return res.status(400).json({ message: "Game title is required" });
  }

  const gameId = await getGameId(title);
  console.log("gameId1", gameId);
  const body = `fields name, cover.url, platforms, genres.name, similar_games, age_ratings, videos.video_id, platforms.abbreviation, rating, age_ratings.category, videos.name, screenshots.url, summary, storyline; where id = ${gameId[0].id};`;
  const response = await fetch(URI, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": `${clientId}`,
      Authorization: `Bearer ${token}`,
    },
    body: body,
  });
  const data = await response.json();

  if (data[0]?.cover?.url) {
    data[0].cover.url = data[0].cover.url.replace("t_thumb", "t_cover_big");
  }

  const game = data[0];

  const similar_games_data = await getSimilarGames(game.similar_games);
  game.similar_games = similar_games_data;
  return res.json({ data: game });
});

// {
//   "data": [
//     {
//       "id": 224438,
//       "name": "God of War: Ghost of Sparta"
//     },
//     {
//       "id": 550,
//       "name": "God of War: Ghost of Sparta"
//     }
//   ]
// }

export { getGameId, getGameData };
