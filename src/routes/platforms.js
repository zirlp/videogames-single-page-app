const { Router } = require("express");
const router = Router();
const { getGamesFromApi } = require("./Controllers/api_controllers");

router.get("/", getPlatforms);

async function getPlatforms(req, res) {
  try {
    const allGames = await getGamesFromApi();

    let allPlatformsFlat = new Set();

    allGames.map((game) => {
      game.platforms.map((platform) => {
        allPlatformsFlat.add(platform);
      });
    });

    let i = 1;
    let allPlatforms = Promise.all([...allPlatformsFlat]).then((all) =>
      all.map((plat) => ({ id: i++, name: plat }))
    );

    return allPlatforms.then((data) => res.send(data));
  } catch (err) {
    return res.status(404).send({ message: "No platforms loaded" });
  }
}

module.exports = router;
