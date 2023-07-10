const express = require("express");
const mongoose = require("mongoose");

const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:3000'
}));
const PORT = 3001;

app.use(express.json());
app.use("/api/v1", require("./src/v1/routes/auth"));

app.get("/", (req, res) => {
    res.json({
        status: "ok"
    })
});

try {
    mongoose.connect(process.env.MONGODB_URL);
} catch (error){
    console.log(error);
}

app.listen(PORT, () => {
    console.log("Server is running");
});