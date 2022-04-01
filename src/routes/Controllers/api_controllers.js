require("dotenv").config();
const { API_KEY } = process.env;
const axios = require("axios");
const { Genre } = require("../../db");

async function getGamesFromApi() {
  try {
    let page = 1;
    let allGames = [];
    while (page <= 5) {
      let apiResponse = axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}`
      );
      await apiResponse.then((r) =>
        r.data.results.map((game) => {
          allGames.push({
            id: game.id,
            name: game.name,
            released: game.released,
            rating: game.rating,
            platforms: game.platforms.map((platform) => platform.platform.name),
            genres: game.genres.map((genre) => genre.name),
            background_image: game.background_image,
          });
        })
      );
      page++;
    }
    return allGames.flat();
  } catch (err) {
    return { message: "No games found in api controller" };
  }
}

async function loadGenresOnDb() {
  try {
    const allGames = await getGamesFromApi();

    let allGenres = new Set();

    allGames.map((game) => {
      game.genres.map((genre) => {
        allGenres.add(genre);
      });
    });

    return Promise.all([...allGenres]).then((allGenres) => {
      for (let i = 0; i < allGenres.length; i++) {
        Genre.create({
          name: allGenres[i],
        });
      }
    });
  } catch (err) {
    return { message: "No genres loaded" };
  }
}

module.exports = {
  loadGenresOnDb,
  getGamesFromApi,
};
