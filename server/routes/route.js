const express = require('express');
const geocodingRouter = require("./geocoding");
const ngoSearchRouter = require("./ngoSearch");

const router = express.Router();
router.get('/', (req, res) => {
    res.send('Welcome to the main API route');
});
router.use(geocodingRouter);
router.use(ngoSearchRouter);
module.exports = router;