const { Router } = require("express");
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const genres = require("./genres");
const videogames = require("./videogames");
const platforms = require("./platforms");

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/videogames", videogames);
router.use("/genres", genres);
router.use("/platforms", platforms);

module.exports = router;
