const JWT = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

const User = require("../models/user");

exports.register = async (req, res) => {
    const password = req.body.password;

    try {
        req.body.password = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY);

        const user = await User.create(req.body);
        const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });
        return res.status(200).json({user, token});
    } catch (err){
        return res.status(500).json(err);
    }
}

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({username: username});
        if(!user) {
            return res.status(401).json({
                errors: {
                    param: "username",
                    message: "Not exist user"
                }
            })
        }

        const descryptedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.SECRET_KEY
        ).toString(CryptoJS.enc.Utf8);

        if(descryptedPassword !== password){
            return res.status(401).json({
                errors: {
                    param: "password",
                    message: "Incorrect password"
                }
            })
        }

        const token = JWT.sign({id: user._id}, process.env.TOKEN_SECRET_KEY, {
            expiresIn: "24h",
        });        

        return res.status(201).json({user, token});

    } catch(err) {
        return res.status(500).json(err);
    }
}