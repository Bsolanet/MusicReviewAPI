const express = require('express');
const router = express.Router();

const db = require('../db.js');

router.post('/', async (req, res) => {
    const { username, password } = req.body;
    const user = await db.getUserByUsername(username);
    if (!user || user.pass !== password) {
        res.status(401).json({ error: 'Invalid username or password' });
        return;
    }
    res.json({ userId: user.userId, username: user.username, password: user.pass });
});

router.get('/:userId/reviews', async (req, res) => {
    const reviews = await db.getReviewsByUserId(req.params.userId);
    res.json(reviews);
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const existingUser = await db.getUserByUsername(username);
    if (existingUser) {
        res.status(409).json({ error: 'User already exists' });
        return;
    }
    
    const userId = await db.createUser(username, password);
    res.json({ userId });
});

module.exports = router;