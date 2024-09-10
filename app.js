const express = require('express');

const artistRouter = require('./routes/artist');
const albumRouter = require('./routes/album');
const genreRouter = require('./routes/genre');
const reviewRouter = require('./routes/review');
const loginRouter = require('./routes/login');

const app = express();
app.use(express.json());

app.use("/artist", artistRouter);
app.use("/album", albumRouter);
app.use("/genre", genreRouter);
app.use("/review", reviewRouter);
app.use("/login", loginRouter);

module.exports = app;