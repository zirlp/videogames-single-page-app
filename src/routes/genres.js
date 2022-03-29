const { Router } = require("express");
const router = Router();
const { Genre } = require("../db");

router.get("/", getGenres);

async function getGenres(req, res) {
  // esto solo busca en la db, obviamente
  //
  const genres = await Genre.findAll();

  if (!genres.length) {
    return res.status(404).send({
      message: "No genres on the data base",
    });
  }
  res.status(200).send(genres);
}

module.exports = router;
