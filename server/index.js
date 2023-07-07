const express = require("express");
const mongoose = require("mongoose");
const CryptoJS = require("crypto-js");
const User = require("./src/v1/models/user");
require("dotenv").config();

const app = express();
const PORT = 3001;

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

app.post("/register", async (req, res) => {
    const password = req.body.password;

    try {
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);

        const user = await User.create(req.body);
    } catch {

    }
})

app.listen(PORT, () => {
    console.log("Server is running");
});