const express = require('express');
const router = express.Router();

const db = require('../db.js');

router.get('/', async (req, res) => {
    const artists = await db.getArtists();
    res.json(artists);
});

router.get('/:artistId', async (req, res) => {
    const artist = await db.getArtistById(req.params.artistId);
    if (!artist) {
        res.status(404).json({ error: 'Artist not found' });
        return;
    }
    res.json(artist);
});

router.get('/:artistId/albums', async (req, res) => {
    const albums = await db.getAlbumsByArtist(req.params.artistId);
    res.json(albums);
});

module.exports = router;