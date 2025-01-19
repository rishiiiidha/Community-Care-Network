const express = require('express');
const router = require('./routes/route');

const app = express();
const port = 3000;
app.use(express.json());
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/api", router);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
