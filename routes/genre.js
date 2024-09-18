const express = require('express');
const router = express.Router();

const db = require('../db.js');

router.get('/', async (req, res) => {
    const genres = await db.getGenres();
    res.json(genres);
});

router.get('/:genreId/albums', async (req, res) => {
    const albums = await db.getAlbumsByGenre(req.params.genreId);
    res.json(albums);
});

module.exports = router;
