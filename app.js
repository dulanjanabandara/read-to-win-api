const express = require('express');
const AppError = require('./utils/appError');

const bookRouter = require('./routes/bookRoutes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/v1/books', bookRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

module.exports = app;
