const { Router } = require("express");
const router = Router();
//prettier-ignore
const { deleteGame, createGame, getGameById, getAllGames } = require("../../Controllers/game_controllers.js");

router.get("/", getAllGames);
router.get("/:id", getGameById);
router.delete("/:id", deleteGame);
router.post("/add", createGame);

module.exports = router;
