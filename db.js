const mysql = require('mysql2');

const dotenv = require('dotenv');
dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
}).promise();

console.log('Connecting to database...');

async function getAlbums() {
    const [rows] = await pool.query('SELECT a2g.albumId, a.title, ar.title AS artist, a.image, GROUP_CONCAT(g.title) AS genre FROM ((album2genre a2g INNER JOIN album a ON a2g.albumId = a.albumId) LEFT JOIN genre g ON a2g.genreId = g.genreId LEFT JOIN artist ar ON a.artistId = ar.artistId) GROUP BY albumId');
    return rows;
}

async function getAlbumById(id) {
    const [rows] = await pool.query('SELECT * FROM album WHERE albumId = ?', [id]);
    return rows[0];
}

async function getUsers() {
    const [rows] = await pool.query('SELECT * FROM users');
    return rows;
}

async function getUserById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
}

async function getUserByUsername(username) {
    const [rows] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
    return rows[0];
}

async function createUser(username, password) {
    const [result] = await pool.query('INSERT INTO users (username, pass) VALUES (?, ?)', [username, password]);
    return result.insertId;
}

async function createReview(albumId, userId, rating, review) {
    const [result] = await pool.query('INSERT INTO reviews (review, albumId, userId, rating) VALUES (?, ?, ?, ?)', [review, albumId, userId, rating]);
    return result.insertId;
}

async function getReviewsByAlbumId(albumId) {
    const [rows] = await pool.query('SELECT * FROM reviews WHERE albumId = ?', [albumId]);
    return rows;
}

async function getReviewsByUserId(userId) {
    const [rows] = await pool.query('SELECT * FROM reviews WHERE userId = ?', [userId]);
    return rows;
}

async function getReviews() {
    const [rows] = await pool.query('SELECT * FROM reviews');
    return rows;
}

async function getAlbumsByGenre(genre) {
    const [rows] = await pool.query('SELECT * FROM album WHERE albumId = ANY(SELECT albumId FROM album2genre WHERE genreId = ?)', [genre]);
    return rows;
}

async function getGenres() {
    const [rows] = await pool.query('SELECT * FROM genre');
    return rows;
}

async function getAlbumsByArtist(artist) {
    const [rows] = await pool.query('SELECT * FROM album WHERE artistId = ?', [artist]);
    return rows;
}

async function getArtists() {
    const [rows] = await pool.query('SELECT * FROM artist');
    return rows;
}

async function getArtistById(id) {
    const [rows] = await pool.query('SELECT * FROM artist WHERE artistId = ?', [id]);
    return rows[0];
}

async function getAlbumsByYear(year) {
    const [rows] = await pool.query('SELECT * FROM album WHERE year = ?', [year]);
    return rows;
}

async function updateAlbumRating(albumId) {
    const [ratings] = await pool.query('SELECT rating FROM review WHERE albumId = ?', [albumId]);
    let totalRating = 0;
    ratings.forEach(rating => totalRating += rating.rating);
    const newRating = totalRating / ratings.length;
    const [result] = await pool.query('UPDATE album SET rating = ? WHERE albumId = ?', [newRating, albumId]);
    return result;
}

module.exports = {
    getAlbums,
    getAlbumById,
    getUsers,
    getUserById,
    getUserByUsername,
    createUser,
    createReview,
    getReviewsByAlbumId,
    getReviewsByUserId,
    getReviews,
    getAlbumsByGenre,
    getGenres,
    getAlbumsByArtist,
    getArtists,
    getArtistById,
    getAlbumsByYear,
    updateAlbumRating
};