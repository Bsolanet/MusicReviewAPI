const express = require('express');
const router = express.Router();

const db = require('../db.js');

router.get('/:albumId', async (req, res) => {
    const reviews = await db.getReviewsByAlbumId(req.params.albumId);
    res.json(reviews);
    await db.updateAlbumRating(req.params.albumId);
});

router.post('/', async (req, res) => {
    const {review, albumId, userId, rating} = req.body;
    const reviewId = await db.createReview(albumId, userId, rating, review);
    res.json({ reviewId });
});

module.exports = router;