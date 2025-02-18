require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(express.json());

const allowedOrigin = process.env.ALLOWED_ORIGIN; // Replace with your allowed URL

app.use(cors({
    origin: [allowedOrigin]
}));

const port = process.env.PORT || 4000;

routes(app);

app.use(function fourOhFourHandler(req, res, next) {
    res.status(404).json({
        message: `Invalid route: ${req.method} ${req.originalUrl}`,
    });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});