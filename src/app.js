const express = require('express');

const app = express();
const routes = require('./routes');
const { middleware, errorHandler } = require('./core');
const { mongo } = require("./db")

middleware(app)
mongo.connect();

app.use('/api', routes);

app.all('*', (req, res) => {
    return errorHandler(
        { message: 'Access denied.', statusCode: 403 },
        req,
        res
    );
});

app.use(errorHandler);

module.exports = app;