const router = require("express").Router();
const { body, validationResult } = require("express-validator");

require("dotenv").config();

const User = require("../models/user");
const validation = require("../handlers/validation");
const userController = require("../controllers/user");

router.post("/register",
     body("username")
    .isLength({min: 8})
    .withMessage("User name must be at least 8 characters long"),
    body("password")
    .isLength({min: 8})
    .withMessage("Password must be at least 8 characters long"),
    body("confirmPassword")
    .isLength({min: 8})
    .withMessage("Confirm Password must be at least 8 characters long"),
    body("username").custom((value) => {
        return User.findOne({username: value}).then((user) => {
            if(user){
                return Promise.reject("User has already existed");
            }
        });
    }),
    validation.validate,
    userController.register
);


module.exports = router;