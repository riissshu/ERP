const express = require("express");
const app = express();
const cors = require('cors')
const path = require("path");

const port = 8080;

app.use(cors())
app.use(express.static(path.join(__dirname, "public")))


app.get("/", (req, res) => {
    res.send(JSON.stringify("Hello"));
})

app.listen(port, () => {
    console.log(`server is listening to ${port}`);
})