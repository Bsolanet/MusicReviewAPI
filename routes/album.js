const express = require('express');
const router = express.Router();

const db = require('../db.js');

router.get('/', async (req, res) => {
    const albums = await db.getAlbums();
    res.json(albums);
});

router.get('/:albumId', async (req, res) => {
    const album = await db.getAlbumById(req.params.albumId);
    if (!album) {
        res.status(404).json({ error: 'Album not found' });
        return;
    }
    res.json(album);
});

module.exports = router;
